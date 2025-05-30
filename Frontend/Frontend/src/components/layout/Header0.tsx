import React from 'react';
import { Menu, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const Header0: React.FC<HeaderProps> = ({ toggleLeftSidebar, toggleRightSidebar }) => {
  return (
    <header className="h-16 border-b border-align-secondary flex items-center justify-between px-4 relative">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleLeftSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Center ALIGN heading */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
        <div className="h-10 w-10 rounded-full align-gradient flex items-center justify-center">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <span className="font-bold text-2xl text-white">ALIGN</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden text-align-muted hover:text-white" onClick={toggleRightSidebar}>
          <History className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header0;