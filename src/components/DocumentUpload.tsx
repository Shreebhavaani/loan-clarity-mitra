
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Loader2, AlertCircle, LogIn } from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DocumentUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [user, setUser] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadDocument, processDocument, isLoading } = useSupabase();
  const { toast } = useToast();

  // Check authentication status
  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPEG, or PNG files only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !user) return;

    try {
      const document = await uploadDocument(selectedFile, user.id);
      
      // Simulate text extraction (in real app, this would use OCR)
      const mockExtractedText = `Loan Agreement\n\nLoan Amount: ₹5,00,000\nInterest Rate: 12% per annum\nTenure: 5 years\nEMI: ₹11,122\n\nThis is a sample extracted text from the uploaded document. In a real implementation, this would be extracted using OCR technology.`;
      
      setExtractedText(mockExtractedText);
      
      // Process the document with AI
      const result = await processDocument(document.id, mockExtractedText);
      setSummary(result.summary);
      
      toast({
        title: "Document processed successfully",
        description: "Your loan document has been analyzed.",
      });
    } catch (error) {
      console.error('Upload/processing error:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Document Upload
            </h1>
            <p className="text-gray-600">Please sign in to upload and analyze your loan documents</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <LogIn className="h-16 w-16 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
              <p className="text-gray-600 mb-6">
                You need to be signed in to upload and process loan documents securely.
              </p>
              <Button 
                onClick={handleSignIn}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Document Upload
          </h1>
          <p className="text-gray-600">Upload your loan documents for AI-powered analysis</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Loan Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-4">
                  <FileText className="h-16 w-16 mx-auto text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button 
                    onClick={handleFileUpload}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Process Document'
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-16 w-16 mx-auto text-gray-400" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drop your files here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports PDF, JPEG, PNG files up to 10MB
                    </p>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpeg,.jpg,.png"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </CardContent>
        </Card>

        {extractedText && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Extracted Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {extractedText}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {summary && (
          <Card className="shadow-lg border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <AlertCircle className="h-5 w-5" />
                AI Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
