import React from 'react';
import { Menu, History, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const Header0: React.FC<HeaderProps> = ({ toggleLeftSidebar, toggleRightSidebar }) => {
    <header className="h-16 border-b border-align-secondary flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleLeftSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full align-gradient flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-bold text-lg text-white">ALIGN</span>
        </div>
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