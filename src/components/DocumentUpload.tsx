
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Camera, Languages, Volume2, CreditCard, Calendar, Percent, IndianRupee, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kannada', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setExtractedInfo(null); // Reset extracted info when new file is uploaded
    }
  };

  const handleExtractDocument = () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      const extractedData = {
        loanAmount: "₹5,00,000",
        interestRate: "10.5% per annum",
        loanTenure: "5 years (60 months)",
        emi: "₹10,746",
        processingFee: "₹5,000 + GST",
        penaltyCharges: "2% per month on overdue amount",
        foreclosureCharges: "4% of outstanding principal",
        summary: getTranslatedSummary(selectedLanguage)
      };
      
      setExtractedInfo(extractedData);
      setIsProcessing(false);
      
      toast({
        title: "Document Processed Successfully!",
        description: `Your loan agreement has been analyzed and translated to ${languages.find(lang => lang.code === selectedLanguage)?.name}.`,
      });
    }, 3000);
  };

  const getTranslatedSummary = (language: string) => {
    const summaries = {
      english: "This is a personal loan of ₹5,00,000 at 10.5% annual interest rate. You will pay ₹10,746 every month for 5 years. There are additional charges like processing fee of ₹5,000 plus GST. If you miss payments, you'll be charged 2% penalty per month. If you want to close the loan early, you'll pay 4% of the remaining amount as foreclosure charges.",
      hindi: "यह ₹5,00,000 का व्यक्तिगत ऋण है जिस पर 10.5% वार्षिक ब्याज दर है। आपको 5 साल तक हर महीने ₹10,746 देना होगा। अतिरिक्त शुल्क जैसे ₹5,000 प्लस जीएसटी की प्रोसेसिंग फीस है। यदि आप भुगतान चूकते हैं, तो आप पर प्रति महीने 2% जुर्माना लगेगा। यदि आप ऋण को जल्दी बंद करना चाहते हैं, तो आपको बकाया राशि का 4% फोरक्लोज़र चार्ज के रूप में देना होगा।",
      tamil: "இது ₹5,00,000 தனிநபர் கடன் ஆகும், இதற்கு 10.5% வருடாந்திர வட்டி விகிதம் உள்ளது. நீங்கள் 5 ஆண்டுகளுக்கு ஒவ்வொரு மாதமும் ₹10,746 செலுத்த வேண்டும். கூடுதல் கட்டணங்கள் உள்ளன, ₹5,000 கூட ஜிஎஸ்டி என்ற செயலாக்க கட்டணம். பணம் செலுத்தாமல் இருந்தால், மாதத்திற்கு 2% அபராதம் விதிக்கப்படும். கடனை முன்கூட்டியே மூட விரும்பினால், மீதமுள்ள தொகையில் 4% முன்கூட்டியே மூடும் கட்டணமாக செலுத்த வேண்டும்.",
      telugu: "ఇది ₹5,00,000 వ్యక్తిগత రుణం, దీనిపై 10.5% వార్షిక వడ్డీ రేటు ఉంది. మీరు 5 సంవత్సరాల పాటు ప్రతి నెలా ₹10,746 చెల్లించాలి. అదనపు ఛార్జీలు ఉన్నాయి, ₹5,000 ప్లస్ జిఎస్టీ ప్రాసెసింగ్ ఫీ. మీరు చెల్లింపులు తప్పిస్తే, నెలకు 2% పెనాల్టీ వసూలు చేస్తారు. మీరు రుణాన్ని ముందుగా మూసివేయాలని అనుకుంటే, మిగిలిన మొత్తంలో 4% ఫోర్క్లోజర్ ఛార్జ్‌గా చెల్లించాలి.",
      bengali: "এটি ₹5,00,000 ব্যক্তিগত ঋণ যার উপর 10.5% বার্ষিক সুদের হার রয়েছে। আপনাকে 5 বছরের জন্য প্রতি মাসে ₹10,746 দিতে হবে। অতিরিক্ত চার্জ আছে যেমন ₹5,000 প্লাস জিএসটি প্রসেসিং ফি। যদি আপনি পেমেন্ট মিস করেন, তাহলে মাসিক 2% জরিমানা ধার্য হবে। যদি আপনি ঋণ আগে বন্ধ করতে চান, তাহলে বাকি অর্থের 4% ফোরক্লোজার চার্জ হিসেবে দিতে হবে।",
      marathi: "हे ₹5,00,000 चे वैयक्तिक कर्ज आहे ज्यावर 10.5% वार्षिक व्याज दर आहे. तुम्हाला 5 वर्षांसाठी दरमहा ₹10,746 द्यावे लागतील. अतिरिक्त शुल्क आहेत जसे ₹5,000 प्लस जीएसटी प्रोसेसिंग फी. जर तुम्ही पेमेंट चुकवाल तर महिन्याला 2% दंड आकारला जाईल. जर तुम्हाला कर्ज लवकर बंद करायचे असेल तर उर्वरित रकमेच्या 4% फोरक्लोजर चार्ज द्यावे लागतील.",
      gujarati: "આ ₹5,00,000 ના વ્યક્તિગત લોનનું 10.5% વાર્ષિક વ્યાજ દર છે. તમારે 5 વર્ષ માટે દર મહિને ₹10,746 આપવાના છે. વધારાના ચાર્જ છે જેમ કે ₹5,000 પ્લસ જીએસટી પ્રોસેસિંગ ફી. જો તમે પેમેન્ટ ચૂકો તો મહિને 2% પેનલ્ટી લાગશે. જો તમે લોન વહેલું બંધ કરવા માંગો તો બાકી રકમના 4% ફોરક્લોઝર ચાર્જ આપવાના પડશે.",
      kannada: "ಇದು ₹5,00,000 ವೈಯಕ್ತಿಕ ಸಾಲವಾಗಿದ್ದು, ಇದರ ಮೇಲೆ 10.5% ವಾರ್ಷಿಕ ಬಡ್ಡಿ ದರವಿದೆ. ನೀವು 5 ವರ್ಷಗಳ ಕಾಲ ಪ್ರತಿ ತಿಂಗಳು ₹10,746 ಪಾವತಿಸಬೇಕು. ಹೆಚ್ಚುವರಿ ಶುಲ್ಕಗಳಿವೆ, ₹5,000 ಜೊತೆಗೆ ಜಿಎಸ್ಟಿ ಪ್ರೊಸೆಸಿಂಗ್ ಫೀ. ನೀವು ಪಾವತಿಯನ್ನು ತಪ್ಪಿಸಿದರೆ, ತಿಂಗಳಿಗೆ 2% ದಂಡ ವಿಧಿಸಲಾಗುತ್ತದೆ. ನೀವು ಸಾಲವನ್ನು ಮುಂಚಿತವಾಗಿ ಮುಚ್ಚಲು ಬಯಸಿದರೆ, ಉಳಿದ ಮೊತ್ತದ 4% ಫೋರ್‌ಕ್ಲೋಶರ್ ಚಾರ್ಜ್ ಪಾವತಿಸಬೇಕು."
    };
    
    return summaries[language as keyof typeof summaries] || summaries.english;
  };

  const playAudioSummary = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
      return;
    }

    // Simulate audio playback with Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(extractedInfo.summary);
      
      // Set language for speech synthesis
      const langCodes = {
        english: 'en-US',
        hindi: 'hi-IN',
        tamil: 'ta-IN',
        telugu: 'te-IN',
        bengali: 'bn-IN',
        marathi: 'mr-IN',
        gujarati: 'gu-IN',
        kannada: 'kn-IN'
      };
      
      utterance.lang = langCodes[selectedLanguage as keyof typeof langCodes] || 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
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

        {/* Language Selection */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Languages className="h-5 w-5 text-purple-600" />
            <label className="text-sm font-medium text-gray-700">Choose your preferred language:</label>
          </div>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg mb-4">
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

                {/* Extract Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleExtractDocument}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Extracting...
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 mr-2" />
                        Extract & Analyze
                      </>
                    )}
                  </Button>
                </div>
                
                {isProcessing && (
                  <div className="mt-6 text-center">
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
                    Loan Summary - {languages.find(lang => lang.code === selectedLanguage)?.name}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playAudioSummary}
                    className="hover:bg-purple-50"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Play Audio
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary Text */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Volume2 className="h-4 w-4 mr-2 text-blue-600" />
                      Simplified Summary:
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {extractedInfo.summary}
                    </p>
                  </div>

                  {/* Key Details Grid */}
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
