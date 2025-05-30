import React, { useState } from 'react';
import { Calendar, Book, Award, Quote, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LeftSidebarProps {
  onDashboardItemClick: (widget: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const dashboardItems = [
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'attendance', name: 'Attendance', icon: Award },
  { id: 'materials', name: 'Saved Materials', icon: Book },
  { id: 'timetable', name: 'Time Table', icon: Calendar }, // New button added
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onDashboardItemClick, isOpen, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div 
      className={cn(
        "w-64 bg-align-secondary border-r border-align-secondary flex flex-col transition-all duration-300 ease-in-out",
        "fixed inset-y-0 left-0 z-40 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-align-secondary">
        <h2 className="font-bold text-xl text-align-accent">DASHBOARD</h2>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
        {dashboardItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onDashboardItemClick(item.id);
              onClose();
            }}
            className="dashboard-card flex items-center gap-3 p-4 hover:bg-align-accent/10"
          >
            <div className="rounded-full bg-align-accent/10 p-2">
              <item.icon className="h-5 w-5 text-align-accent" />
            </div>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-align-secondary">
        <div className="glass-card p-3 mb-4 flex items-center justify-between border-2 border-blue-500 rounded-lg">
          <div>
            <p className="text-xs text-align-muted">Need assistance?</p>
            <p className="text-sm">Contact Support</p>
          </div>
          {/* Phone icon inside a circle */}
          <div className="rounded-full bg-align-accent/10 p-2">
            <Phone className="h-5 w-5 text-align-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
