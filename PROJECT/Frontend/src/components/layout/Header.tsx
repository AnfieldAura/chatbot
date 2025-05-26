
import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleLeftSidebar, toggleRightSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New assignment uploaded: Math 101' },
    { id: 2, message: 'Meeting scheduled with Academic Advisor' },
    { id: 3, message: 'Exam results are out!' },
    { id: 4, message: 'Project deadline extended to next week' },
  ];

  return (
    <header className="h-16 border-b border-align-secondary flex items-center justify-between px-4">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full align-gradient flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-bold text-2xl text-white">ALIGN</span> {/* Increased text size */}
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        {/* Notification Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`text-white rounded-md ${
            showNotifications ? 'bg-blue-500 ring-2 ring-blue-700' : 'hover:bg-blue-600'
          }`}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-5 w-5" />
        </Button>

        {/* Notifications Box */}
        {showNotifications && (
          <div className="absolute right-0 top-12 w-96 max-h-[32rem] bg-gray-800 border border-blue-500 rounded-lg shadow-lg p-6 z-50 overflow-y-auto">
            <h4 className="text-white font-bold mb-4">NOTIFICATIONS</h4>
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="text-base text-gray-300 bg-gray-700 p-4 rounded-md hover:bg-gray-600"
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-align-muted hover:text-white">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-align-secondary border-align-accent">
            <DropdownMenuLabel className="text-align-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-align-muted/20" />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="text-align-foreground hover:bg-align-accent/20">Profile</Link>
            </DropdownMenuItem>
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