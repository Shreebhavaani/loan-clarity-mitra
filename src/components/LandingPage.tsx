
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  MessageCircle, 
  Shield, 
  Zap, 
  Heart, 
  Globe,
  Upload,
  Bot,
  Languages,
  Volume2
} from 'lucide-react';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPageChange }) => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Document Analysis",
      description: "Upload your loan documents and get AI-powered analysis with key information extraction."
    },
    {
      icon: <Bot className="h-8 w-8 text-pink-600" />,
      title: "AI Assistant",
      description: "Chat with LoanMitra to understand complex loan terms and get personalized financial advice."
    },
    {
      icon: <Languages className="h-8 w-8 text-purple-600" />,
      title: "Multi-Language Support",
      description: "Access information in 8+ Indian languages including Hindi, Bengali, Tamil, and more."
    },
    {
      icon: <Volume2 className="h-8 w-8 text-pink-600" />,
      title: "Audio Assistance",
      description: "Listen to explanations with text-to-speech functionality for better accessibility."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Secure & Private",
      description: "Your documents and data are encrypted and securely stored with bank-level security."
    },
    {
      icon: <Zap className="h-8 w-8 text-pink-600" />,
      title: "Instant Processing",
      description: "Get immediate insights and summaries from your loan documents in seconds."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              LoanMitra
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Empowering women with AI-powered loan document analysis and financial literacy tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange('upload')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Document
              </Button>
              <Button
                onClick={() => onPageChange('chat')}
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 text-lg px-8 py-4"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Ask Questions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Financial Empowerment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              LoanMitra combines advanced AI technology with user-friendly design to make loan documents understandable for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How LoanMitra Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to understand your loan documents better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
              <p className="text-gray-600">
                Upload your loan agreement, EMI schedule, or any financial document in PDF or image format.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI extracts key information like loan amount, interest rate, EMI, and terms in your preferred language.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Receive clear summaries, ask questions, and get personalized financial advice from our AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-pink-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Take Control of Your Financial Future
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of women who are making informed financial decisions with LoanMitra
          </p>
          <Button
            onClick={() => onPageChange('login')}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
