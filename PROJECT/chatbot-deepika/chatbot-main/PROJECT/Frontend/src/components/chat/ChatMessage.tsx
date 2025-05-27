import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-lg border-2 border-blue-500 ${
          isUser ? 'bg-align-primary text-align-foreground' : 'bg-align-secondary text-align-muted'
        }`}
        style={{
          outline: 'none', // Removes any outline
          boxShadow: 'none', // Ensures no shadow is applied
          borderColor: 'transparent', // Removes the blue border
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
