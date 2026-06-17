
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

export default function GeminiAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey there! 👋 I\'m GeminiAI, your personal assistant. Ask me anything about our stars - who\'s streaming tonight, find brunettes in America, or anything else you\'d like to know!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are GeminiAI, a helpful assistant for LiveGemini, an adult entertainment platform. 
        
Context about the platform:
- We have featured fans/models like Ahri, Candy Crush, Sassy Sarah, Olivia Opal, and many more
- We offer live cams, videos, photos, and galleries
- We have a marketplace with adult products
- Users can subscribe, buy custom content, and interact with models

IMPORTANT - Notification System Information:
- Models typically have live cam sessions scheduled several times a week, but exact times can vary
- Users should check model profiles on LiveGemini for the latest schedule updates
- Users can currently subscribe/follow models on the platform to get notifications
- EMAIL NOTIFICATIONS: When the full app is built, we WILL have email notification functionality where customers will receive emails when their favorite streamers come online
- This email notification feature is planned and will be implemented - assure users of this!

If users ask about email notifications specifically:
- Confirm that YES, email notifications will be available when the app is fully built
- Tell them they'll receive emails when their favorite models go live
- For now, they can follow/subscribe to models on LiveGemini to receive notifications through the platform
- Encourage them that this feature is coming soon

User question: ${userMessage}

Please provide a helpful, friendly response. If asked about specific models or content, be creative and engaging while staying professional. Keep responses concise but informative.`,
        add_context_from_internet: false
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Oops! I encountered an error. Please try again or rephrase your question.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl flex items-center justify-center cursor-pointer"
        >
          {/* Glowing circular animation */}
          <div className="absolute inset-0 rounded-full animate-ping bg-purple-400 opacity-20"></div>
          <div className="absolute inset-0 rounded-full">
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="70 200"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Gemini Logo */}
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png"
            alt="GeminiAI"
            className="w-8 h-8 object-contain relative z-10"
          />
        </button>

        {/* Hover Name Label */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white/10 backdrop-blur-xl px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none"
        >
          <span className="text-white font-medium text-sm">GeminiAI</span>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-[#2E2249]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png"
                    alt="GeminiAI"
                    className="w-8 h-8"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2E2249]"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">GeminiAI</h3>
                  <p className="text-xs text-white/60">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-2.5">
                    <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-[#1a0e2e]/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  );
}
