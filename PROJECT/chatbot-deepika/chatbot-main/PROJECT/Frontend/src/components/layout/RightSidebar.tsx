import React from 'react';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (chatId: string) => void; // Added onSelectChat property
  userId: string; // Added userId property
}

const chatHistory = [
  { id: 1, title: "Course registration", date: "Apr 8" },
  { id: 2, title: "Final exam schedule", date: "Apr 7" },
  { id: 3, title: "Scholarship info", date: "Apr 6" },
  { id: 4, title: "Tuition payment", date: "Apr 5" },
  { id: 5, title: "Housing application", date: "Apr 4" },
  { id: 6, title: "Transfer credits", date: "Apr 3" },
  { id: 7, title: "Major requirements", date: "Apr 2" },
  { id: 8, title: "Minor declaration", date: "Apr 1" },
];

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose, onSelectChat, userId }) => {
  return (
    <div 
      className={cn(
        "w-64 bg-align-secondary border-l border-align-secondary flex flex-col transition-all duration-300 ease-in-out",
        "fixed inset-y-0 right-0 z-40 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-align-secondary">
        <h2 className="font-bold text-xl text-align-accent">HISTORY</h2>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-align-muted" />
          <Input 
            placeholder="Search history..." 
            className="pl-8 bg-align/30 border-align-secondary text-align-foreground placeholder:text-align-muted"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {chatHistory.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id.toString())} // Call onSelectChat with chatId
            className="w-full p-3 mb-2 text-left rounded-lg hover:bg-align-accent/10 transition-colors duration-200"
          >
            <p className="font-medium truncate">{chat.title}</p>
            <p className="text-xs text-align-muted">{chat.date}</p>
          </button>
        ))}
      </div>

      {/* Display userId for debugging or additional functionality */}
      <div className="p-4 text-xs text-align-muted">
        <p>User ID: {userId}</p>
      </div>
    </div>
  );
};

export default RightSidebar;