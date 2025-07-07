
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadDocument = async (file: File, userId: string) => {
    setIsLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('loan-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Insert document record
      const { data, error: dbError } = await supabase
        .from('loan_documents')
        .insert({
          user_id: userId,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          status: 'uploaded'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: "Document uploaded successfully",
        description: "Your document is now being processed.",
      });

      return data;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const processDocument = async (documentId: string, text: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('process-document', {
        body: { documentId, text }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Processing error:', error);
      throw error;
    }
  };

  const translateText = async (text: string, targetLanguage: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: { text, targetLanguage }
      });

      if (error) throw error;
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  };

  const askQuestion = async (question: string, context?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { question, context }
      });

      if (error) throw error;
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

      if (error) throw error;
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
