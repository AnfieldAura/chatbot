import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import SuggestedQueries from './SuggestedQueries';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const MainChat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm ALIGN, your student assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      console.log('Sending request to server with query:', inputValue);

      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend Error:', errorData);
        throw new Error(errorData.error || 'Failed to fetch response from the server.');
      }

      const data = await response.json();
      console.log('Response data:', data);

      const botMessageText =
        data.generated_response || data.answer || "Sorry, I couldn't process your request.";

      const botMessage: Message = {
        id: messages.length + 1,
        text: botMessageText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Network or API Error:', error);

      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 1,
          text: 'Oops! Something went wrong while processing your request. Please ensure you have a stable internet connection and try again. If the issue persists, contact support.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQueryClick = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-t border-b border-blue-500">
        <h2 className="text-2xl font-bold text-white">Chat with ALIGN</h2>
        <p className="text-align-muted">(Your personal student assistant)</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.sender === 'user'}
          />
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-align-accent flex items-center justify-center">
              <img
                src="/path-to-bot-image.png" // Replace with the actual path to your bot image
                alt="Bot"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
            <div className="bg-align-secondary rounded-2xl rounded-tl-none p-3 max-w-[80%]">
              <div className="typing-dots h-4">Typing</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested queries */}
      <div className="p-4 border-t border-blue-500">
        <SuggestedQueries onQueryClick={handleQueryClick} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-blue-500">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="bg-align-secondary border-2 border-blue-500 text-align-foreground placeholder:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none outline-none rounded-lg px-4 py-2 w-full"
          />
          <Button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
