
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, MessageCircle, Languages, Volume2, Shield, Heart } from 'lucide-react';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPageChange }) => {
  const features = [
    {
      icon: Upload,
      title: "Upload & Analyze",
      description: "Simply upload your loan document and our AI will extract all the important information for you."
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Get explanations in your preferred language - Hindi, English, or your regional language."
    },
    {
      icon: Volume2,
      title: "Voice Assistance",
      description: "Listen to explanations with our text-to-speech feature, perfect for any literacy level."
    },
    {
      icon: MessageCircle,
      title: "Ask Questions",
      description: "Chat with our AI assistant to get clear answers about any loan terms you don't understand."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your documents and personal information are completely secure and private."
    },
    {
      icon: Heart,
      title: "Made for Women",
      description: "Designed specifically to empower women with financial knowledge and confidence."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Understand Your
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}Loans{" "}
              </span>
              with Confidence
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              LoanMitra helps women understand loan agreements in simple language. 
              Upload your documents, get clear explanations, and make informed financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange('upload')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                Upload Your Document
              </Button>
              <Button
                onClick={() => onPageChange('chat')}
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg"
              >
                Ask Questions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Understand Loans
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to make financial literacy accessible to everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of women who are making informed loan decisions with LoanMitra
          </p>
          <Button
            onClick={() => onPageChange('login')}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
