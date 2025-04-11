
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={cn(
      "flex items-start gap-3",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-align-accent flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">A</span>
        </div>
      )}
      
      <div className={cn(
        "rounded-2xl p-3 max-w-[80%]",
        isUser 
          ? "bg-align-accent text-white rounded-tr-none" 
          : "bg-align-secondary rounded-tl-none"
      )}>
        <p className="text-sm">{message}</p>
      </div>
      
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">U</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
