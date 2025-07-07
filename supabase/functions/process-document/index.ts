
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { documentId, text, language = 'english' } = await req.json()

    // Get OpenAI API key from secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Process document with OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert loan document analyzer. Extract key information from loan documents and provide a clear summary. Focus on: loan amount, interest rate, tenure, EMI, collateral, and important terms. Respond in ${language}.`
          },
          {
            role: 'user',
            content: `Analyze this loan document text and provide a summary: ${text}`
          }
        ],
        max_tokens: 1000,
      }),
    })

    const openaiData = await openaiResponse.json()
    const summary = openaiData.choices[0]?.message?.content || 'Unable to generate summary'

    // Update document in database
    const { error } = await supabaseClient
      .from('loan_documents')
      .update({
        extracted_text: text,
        summary: summary,
        status: 'processed',
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    if (error) throw error

    return new Response(JSON.stringify({ success: true, summary }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
