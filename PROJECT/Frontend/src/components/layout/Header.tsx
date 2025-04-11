
import React from 'react';
import { Bell, Menu, History, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleLeftSidebar, toggleRightSidebar }) => {
  return (
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
        <Button variant="ghost" size="icon" className="text-align-muted hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="md:hidden text-align-muted hover:text-white" onClick={toggleRightSidebar}>
          <History className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-align-muted hover:text-white">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-align-secondary border-align-accent">
            <DropdownMenuLabel className="text-align-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-align-muted/20" />
            <DropdownMenuItem className="text-align-foreground hover:bg-align-accent/20">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-align-foreground hover:bg-align-accent/20">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-align-muted/20" />
            <DropdownMenuItem className="text-align-foreground hover:bg-align-accent/20">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
