
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadDocument = async (file: File, userId: string) => {
    setIsLoading(true);
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to upload documents');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      console.log('Uploading file:', { filePath, fileSize: file.size, fileType: file.type });

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('loan-documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Insert document record
      const { data, error: dbError } = await supabase
        .from('loan_documents')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          status: 'uploaded'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast({
        title: "Document uploaded successfully",
        description: "Your document is now being processed.",
      });

      return data;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your document.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const processDocument = async (documentId: string, text: string, language = 'english') => {
    try {
      console.log('Processing document:', { documentId, textLength: text.length, language });
      
      const { data, error } = await supabase.functions.invoke('process-document', {
        body: { documentId, text, language }
      });

      if (error) {
        console.error('Processing error:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Processing error:', error);
      throw error;
    }
  };

  const translateText = async (text: string, targetLanguage: string) => {
    try {
      console.log('Translating text:', { textLength: text.length, targetLanguage });
      
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: { text, targetLanguage }
      });

      if (error) {
        console.error('Translation error:', error);
        throw error;
      }
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  };

  const askQuestion = async (question: string, context?: string, language = 'english') => {
    try {
      console.log('Asking question:', { question, hasContext: !!context, language });
      
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { question, context, language }
      });

      if (error) {
        console.error('Chat error:', error);
        throw error;
      }
      return data.answer;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  };

  const getUserDocuments = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('loan_documents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get documents error:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Get documents error:', error);
      throw error;
    }
  };

  return {
    isLoading,
    uploadDocument,
    processDocument,
    translateText,
    askQuestion,
    getUserDocuments
  };
};
