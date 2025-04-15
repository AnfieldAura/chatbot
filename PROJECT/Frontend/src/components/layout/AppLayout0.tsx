
import React, { useState } from 'react';
import Header0 from './Header0';
import MainChat from '../chat/MainChat';
import Dashboard from '../dashboard/Dashboard';

const AppLayout: React.FC = () => {
  const [activeView, setActiveView] = useState<'chat' | 'dashboard'>('chat');
  const [activeDashboardWidget, setActiveDashboardWidget] = useState<string | null>(null);
  const [isMobileLeftSidebarOpen, setIsMobileLeftSidebarOpen] = useState(false);
  const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);

  const handleDashboardItemClick = (widget: string) => {
    setActiveView('dashboard');
    setActiveDashboardWidget(widget);
  };

  const handleBackToChat = () => {
    setActiveView('chat');
    setActiveDashboardWidget(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-align">
      <Header0 
        toggleLeftSidebar={() => setIsMobileLeftSidebarOpen(!isMobileLeftSidebarOpen)} 
        toggleRightSidebar={() => setIsMobileRightSidebarOpen(!isMobileRightSidebarOpen)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeView === 'chat' ? (
            <MainChat />
          ) : (
            <Dashboard 
              activeWidget={activeDashboardWidget} 
              onBackClick={handleBackToChat} 
            />
          )}
        </div>
        
        
      </div>
    </div>
  );
};

export default AppLayout;
