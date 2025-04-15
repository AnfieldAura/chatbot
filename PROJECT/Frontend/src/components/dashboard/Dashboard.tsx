
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarWidget from './widgets/CalendarWidget';
import AttendanceWidget from './widgets/AttendanceWidget';
import MaterialsWidget from './widgets/MaterialsWidget';
import QuoteWidget from './widgets/QuoteWidget';
import TimeTableWidget from './widgets/TimetableWidget';

interface DashboardProps {
  activeWidget: string | null;
  onBackClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeWidget, onBackClick }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-align-secondary flex items-center">
        <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-white">
          {activeWidget === 'calendar' && 'Calendar'}
          {activeWidget === 'attendance' && 'Attendance'}
          {activeWidget === 'timetable' && 'Timetable'}
          {activeWidget === 'materials' && 'Saved Materials'}
          {activeWidget === 'quote' && 'Daily Quote'}
          {!activeWidget && 'Dashboard'}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4 md:grid-cols-2">
          {activeWidget === 'calendar' || !activeWidget ? (
            <div className={`${!activeWidget ? 'md:col-span-2' : 'md:col-span-2'}`}>
              <CalendarWidget />
            </div>
          ) : null}
          
          {activeWidget === 'attendance' || !activeWidget ? (
            <div>
              <AttendanceWidget />
            </div>
          ) : null}
          {activeWidget === 'timetable' || !activeWidget ? (
            <div>
              <TimeTableWidget />
              </div>
              ) : null}
          {activeWidget === 'materials' || !activeWidget ? (
            <div>
              <MaterialsWidget />
            </div>
          ) : null}
          
          {activeWidget === 'quote' || !activeWidget ? (
            <div>
              <QuoteWidget />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
