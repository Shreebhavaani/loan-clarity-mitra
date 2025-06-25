
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Camera, Languages, Volume2, CreditCard, Calendar, Percent, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate AI processing
      setIsProcessing(true);
      setTimeout(() => {
        setExtractedInfo({
          loanAmount: "₹5,00,000",
          interestRate: "10.5% per annum",
          loanTenure: "5 years (60 months)",
          emi: "₹10,746",
          processingFee: "₹5,000 + GST",
          penaltyCharges: "2% per month on overdue amount",
          foreclosureCharges: "4% of outstanding principal"
        });
        setIsProcessing(false);
        toast({
          title: "Document Processed Successfully!",
          description: "Your loan agreement has been analyzed and simplified.",
        });
      }, 3000);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Loan Document
          </h1>
          <p className="text-lg text-gray-600">
            Get instant analysis and simplified explanations of your loan terms
          </p>
        </div>

        {!uploadedFile ? (
          <Card className="max-w-2xl mx-auto border-2 border-dashed border-purple-300 bg-white/50">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Upload Your Loan Agreement
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop your document here, or click to browse. We support PDF, JPG, and PNG files.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <FileText className="h-5 w-5 mr-2" />
                    Choose File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </label>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Camera className="h-5 w-5 mr-2" />
                  Scan Document
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Uploaded Document Info */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-purple-600" />
                  Uploaded Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUploadedFile(null);
                      setExtractedInfo(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                
                {isProcessing && (
                  <div className="mt-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-purple-600 font-medium">
                      Analyzing your document with AI...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Extracted Information */}
            {extractedInfo && (
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Loan Summary
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => speakText("Here is your loan summary")}
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      Listen
                    </Button>
                    <Button variant="outline" size="sm">
                      <Languages className="h-4 w-4 mr-1" />
                      Translate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <IndianRupee className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Loan Amount</p>
                        <p className="font-semibold text-gray-900">{extractedInfo.loanAmount}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Percent className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Interest Rate</p>
                        <p className="font-semibold text-gray-900">{extractedInfo.interestRate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Loan Tenure</p>
                        <p className="font-semibold text-gray-900">{extractedInfo.loanTenure}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                      <CreditCard className="h-5 w-5 text-orange-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Monthly EMI</p>
                        <p className="font-semibold text-gray-900">{extractedInfo.emi}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Important Charges:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Processing Fee: {extractedInfo.processingFee}</li>
                      <li>• Late Payment Penalty: {extractedInfo.penaltyCharges}</li>
                      <li>• Foreclosure Charges: {extractedInfo.foreclosureCharges}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
