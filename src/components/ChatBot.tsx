
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mic, Volume2, Languages, MessageCircle, Bot, User, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your loan assistant. I can help you understand loan terms, EMI calculations, and answer any questions about loans. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const commonQuestions = [
    { text: "What is EMI?", icon: "💰" },
    { text: "How is interest calculated?", icon: "📊" },
    { text: "What happens if I miss a payment?", icon: "⚠️" },
    { text: "Can I prepay my loan?", icon: "💸" },
    { text: "What is foreclosure?", icon: "🏠" },
    { text: "What are processing fees?", icon: "💳" }
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes('emi')) {
      return "EMI stands for Equated Monthly Installment. It's the fixed amount you pay every month to repay your loan. EMI includes both the principal amount and interest. The formula is: EMI = [P × R × (1+R)^N] / [(1+R)^N-1], where P is principal, R is monthly interest rate, and N is number of months.";
    }
    
    if (text.includes('interest')) {
      return "Interest is the cost of borrowing money. It's calculated as a percentage of your loan amount annually. For example, if you have a ₹1,00,000 loan at 10% annual interest, you'll pay ₹10,000 in interest per year. Banks usually quote annual rates, but calculate interest monthly.";
    }
    
    if (text.includes('miss') && text.includes('payment')) {
      return "Missing EMI payments can have serious consequences: 1) Late payment charges (usually 2-4% of EMI), 2) Negative impact on credit score, 3) Additional interest on overdue amount, 4) After 90+ days, loan becomes NPA (Non-Performing Asset), 5) Legal action and asset seizure possible. Always contact your bank immediately if you anticipate payment issues.";
    }
    
    if (text.includes('prepay') || text.includes('foreclosure')) {
      return "Prepayment means paying off your loan before the tenure ends. Benefits include: saving on interest payments and becoming debt-free early. However, some banks charge prepayment penalties (typically 2-4% of outstanding amount). For home loans, there's usually no prepayment penalty after 6 months to 1 year.";
    }
    
    if (text.includes('processing fee')) {
      return "Processing fees are charges for loan approval and disbursement. They typically range from 0.5% to 3% of loan amount, with a minimum and maximum cap. This fee covers document verification, credit checks, and administrative costs. It's usually non-refundable, even if your loan gets rejected.";
    }
    
    return "I understand you're asking about loan terms. Could you be more specific? I can help explain EMI calculations, interest rates, penalties, prepayment options, and other loan-related topics. Feel free to ask about any specific term in your loan agreement!";
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };
      recognition.start();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ask Your Loan Questions
          </h1>
          <p className="text-lg text-gray-600">
            Get instant answers to your loan-related questions in simple language
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                  <HelpCircle className="h-5 w-5 mr-2 text-purple-600" />
                  Common Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {commonQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-4 text-sm border-gray-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md group-hover:text-purple-700"
                      onClick={() => sendMessage(question.text)}
                    >
                      <span className="text-lg mr-3 group-hover:animate-pulse">
                        {question.icon}
                      </span>
                      <span className="flex-1 leading-relaxed group-hover:font-medium transition-all duration-200">
                        {question.text}
                      </span>
                    </Button>
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 to-pink-100/0 group-hover:from-purple-100/20 group-hover:to-pink-100/20 transition-all duration-300 pointer-events-none rounded-lg"></div>
                  </div>
                ))}
                
                {/* Additional helpful tip */}
                <div className="mt-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-600 text-center">
                    💡 Click any question above or type your own below
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-[600px] flex flex-col border-0">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-purple-600" />
                  Loan Assistant
                  <div className="ml-auto flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                    >
                      <Languages className="h-4 w-4 mr-1" />
                      हिंदी
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 transition-all duration-300 hover:shadow-md ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === 'bot' && (
                            <Bot className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                          )}
                          {message.sender === 'user' && (
                            <User className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            {message.sender === 'bot' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 h-6 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200"
                                onClick={() => speakText(message.text)}
                              >
                                <Volume2 className="h-3 w-3 mr-1" />
                                Listen
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Enhanced Input Area */}
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask me anything about loans..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                    className="flex-1 border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-all duration-200"
                  />
                  <Button
                    onClick={startListening}
                    variant="outline"
                    size="icon"
                    className={`transition-all duration-300 hover:scale-105 ${
                      isListening 
                        ? 'bg-red-100 text-red-600 border-red-300 hover:bg-red-200' 
                        : 'hover:bg-purple-50 hover:border-purple-300'
                    }`}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => sendMessage(inputText)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
