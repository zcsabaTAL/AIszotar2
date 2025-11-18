
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Term } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { CloseIcon, SendIcon, SparklesIcon, LoadingSpinner } from './Icons';

interface ChatBotProps {
  onClose: () => void;
  dictionary: Term[];
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose, dictionary }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const initialHistory = [{
      role: 'user',
      parts: [{ text: 'Szia! Segíts nekem megérteni az AI fogalmakat.' }]
  }, {
      role: 'model',
      parts: [{ text: `Szia! Természetesen. Én egy AI-asszisztens vagyok, aki a magyar AI-szótár alapján segít. Kérdezz bátran bármelyik fogalomról, vagy kérj összehasonlítást! Például: "Mi a különbség a Gépi tanulás és a Generatív MI között?"`}]
  }];

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const geminiHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    try {
      const aiResponseText = await getChatbotResponse([...initialHistory, ...geminiHistory], input);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Sajnálom, hiba történt. Kérlek, próbáld újra később.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-11/12 max-w-md h-[70vh] bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
      <header className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-sky-400" />
          <h2 className="font-bold text-lg text-white">AI Szótár Asszisztens</h2>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
      </header>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex gap-3 my-2">
            <div className="bg-sky-500/20 text-sky-300 p-2 rounded-full h-fit">
                <SparklesIcon className="w-5 h-5"/>
            </div>
            <div className="bg-slate-700 p-3 rounded-lg rounded-tl-none">
              <p className="text-sm">Szia! Kérdezz bátran az AI fogalmakról!</p>
            </div>
          </div>
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 my-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && (
                  <div className="bg-sky-500/20 text-sky-300 p-2 rounded-full h-fit">
                      <SparklesIcon className="w-5 h-5"/>
                  </div>
              )}
              <div className={`${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-lg rounded-br-none' : 'bg-slate-700 rounded-lg rounded-tl-none'} p-3 max-w-xs`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
           {isLoading && (
             <div className="flex gap-3 my-2">
                <div className="bg-sky-500/20 text-sky-300 p-2 rounded-full h-fit">
                    <SparklesIcon className="w-5 h-5"/>
                </div>
                <div className="bg-slate-700 p-3 rounded-lg rounded-tl-none">
                   <LoadingSpinner className="w-5 h-5 text-slate-300" />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center bg-slate-700 rounded-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Kérdezz valamit..."
            className="flex-1 bg-transparent p-3 text-white placeholder-slate-400 focus:outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="p-3 text-slate-400 hover:text-sky-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
