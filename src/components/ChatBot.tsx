
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mic, Volume2, Languages, MessageCircle, Bot, User } from 'lucide-react';

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
    "What is EMI?",
    "How is interest calculated?",
    "What happens if I miss a payment?",
    "Can I prepay my loan?",
    "What is foreclosure?",
    "What are processing fees?"
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
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Common Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {commonQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => sendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-lg h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-purple-600" />
                  Loan Assistant
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm">
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
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-100 text-gray-900'
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
                            <p className="text-sm">{message.text}</p>
                            {message.sender === 'bot' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 h-6 text-xs text-purple-600 hover:text-purple-700"
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

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask me anything about loans..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                    className="flex-1"
                  />
                  <Button
                    onClick={startListening}
                    variant="outline"
                    size="icon"
                    className={isListening ? 'bg-red-100 text-red-600' : ''}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => sendMessage(inputText)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
