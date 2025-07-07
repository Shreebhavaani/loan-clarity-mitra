
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Volume2, Languages, Loader2, LogIn, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabase } from '@/hooks/useSupabase';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      text: 'Hello! I\'m LoanMitra, your AI assistant for loan documents and financial guidance. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { askQuestion, translateText } = useSupabase();
  const { toast } = useToast();

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setApiKeyMissing(false);

    try {
      // Get AI response
      let response = await askQuestion(inputText, undefined, selectedLanguage);
      
      // Translate if needed and language is not English
      if (selectedLanguage !== 'english') {
        try {
          response = await translateText(response, selectedLanguage);
        } catch (translationError) {
          console.log('Translation failed, using original response');
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      let errorMessage = 'I apologize, but I\'m having trouble responding right now. Please try again later.';
      
      if (error.message?.includes('OpenAI API key not configured')) {
        errorMessage = 'The AI service is not configured yet. Please contact support to set up the OpenAI API key.';
        setApiKeyMissing(true);
      }

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              LoanMitra Assistant
            </h1>
            <p className="text-gray-600">Please sign in to chat with your AI financial assistant</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <LogIn className="h-16 w-16 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
              <p className="text-gray-600 mb-6">
                Sign in to access your personalized AI assistant for loan guidance and document analysis.
              </p>
              <Button 
                onClick={handleSignIn}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Sign In to Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            LoanMitra Assistant
          </h1>
          <p className="text-gray-600">Ask questions about your loan documents and financial planning</p>
        </div>

        {apiKeyMissing && (
          <Card className="shadow-lg mb-6 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-orange-700">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">
                  AI features require OpenAI API key configuration. Please contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                Chat Assistant
              </CardTitle>
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-gray-500" />
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.sender === 'bot' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(message.text)}
                        className="p-1 h-6 w-6 opacity-70 hover:opacity-100"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about loan terms, EMI calculations, or financial advice..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatBot;
