import React, { useState } from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainChat from '../chat/MainChat';
import Dashboard from '../dashboard/Dashboard';

// Define the type for the AppLayout component (already correct, just ensuring clarity)
const AppLayout: React.FC = () => {
  // State declarations with explicit types for clarity
  const [activeView, setActiveView] = useState<'chat' | 'dashboard'>('chat');
  const [activeDashboardWidget, setActiveDashboardWidget] = useState<string | null>(null);
  const [isMobileLeftSidebarOpen, setIsMobileLeftSidebarOpen] = useState<boolean>(false);
  const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState<boolean>(false);

  // Handler for clicking a dashboard item
  const handleDashboardItemClick = (widget: string): void => {
    setActiveView('dashboard');
    setActiveDashboardWidget(widget);
  };

  // Handler for returning to chat view
  const handleBackToChat = (): void => {
    setActiveView('chat');
    setActiveDashboardWidget(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-align">
      {/* Header with sidebar toggle handlers */}
      <Header
        toggleLeftSidebar={() => setIsMobileLeftSidebarOpen(!isMobileLeftSidebarOpen)}
        toggleRightSidebar={() => setIsMobileRightSidebarOpen(!isMobileRightSidebarOpen)}
      />

      {/* Main layout with sidebars and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Dashboard Navigation) */}
        <LeftSidebar
          onDashboardItemClick={handleDashboardItemClick}
          isOpen={isMobileLeftSidebarOpen}
          onClose={() => setIsMobileLeftSidebarOpen(false)}
        />

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

        {/* Right Sidebar (History) */}
        <RightSidebar
          isOpen={isMobileRightSidebarOpen}
          onClose={() => setIsMobileRightSidebarOpen(false)}
          
          // userId="currentUserId" // Removed as it is not part of RightSidebarProps
        />
      </div>
    </div>
  );
};

export default AppLayout;