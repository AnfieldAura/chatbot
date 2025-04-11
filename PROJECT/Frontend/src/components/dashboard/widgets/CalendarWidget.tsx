
import React from 'react';
import { Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Event {
  id: number;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'meeting';
}

const events: Event[] = [
  { id: 1, title: 'Midterm Exam: Math 101', date: '2025-04-10', type: 'exam' },
  { id: 2, title: 'Research Paper Due', date: '2025-04-15', type: 'assignment' },
  { id: 3, title: 'Meeting with Academic Advisor', date: '2025-04-12', type: 'meeting' },
  { id: 4, title: 'Group Project Presentation', date: '2025-04-18', type: 'assignment' },
  { id: 5, title: 'Final Exam: History 202', date: '2025-04-22', type: 'exam' },
];

const CalendarWidget: React.FC = () => {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  
  // Get current week dates (simplified)
  const getDaysInWeek = () => {
    const days = [];
    const firstDayOfWeek = new Date(today);
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    firstDayOfWeek.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };
  
  const weekDays = getDaysInWeek();

  const getEventForDate = (date: Date): Event | undefined => {
    const dateString = date.toISOString().split('T')[0];
    return events.find(event => event.date === dateString);
  };
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-align-accent" />
          <h3 className="font-bold text-lg">Academic Calendar</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-align-muted hover:text-align-foreground">
          <Info className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-lg">{currentMonth} {currentYear}</h4>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-align-muted text-xs py-1">
              {day}
            </div>
          ))}
          
          {weekDays.map((date, index) => {
            const isToday = date.toDateString() === today.toDateString();
            const event = getEventForDate(date);
            
            return (
              <div 
                key={index} 
                className={cn(
                  "aspect-square rounded-md flex flex-col items-center justify-center text-sm relative",
                  isToday ? "bg-align-accent text-white" : "hover:bg-align-secondary/80"
                )}
              >
                <span>{date.getDate()}</span>
                {event && (
                  <div 
                    className={cn(
                      "w-2 h-2 rounded-full absolute bottom-1",
                      event.type === 'exam' ? "bg-red-500" : 
                      event.type === 'assignment' ? "bg-yellow-500" : 
                      "bg-green-500"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Upcoming Events</h4>
        <div className="space-y-2">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="p-2 rounded-md bg-align/50 hover:bg-align-accent/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className={cn(
                      "w-3 h-3 rounded-full",
                      event.type === 'exam' ? "bg-red-500" : 
                      event.type === 'assignment' ? "bg-yellow-500" : 
                      "bg-green-500"
                    )}
                  />
                  <p className="font-medium text-sm">{event.title}</p>
                </div>
                <p className="text-xs text-align-muted">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button variant="outline" className="w-full mt-4 bg-align-secondary border-align-secondary hover:bg-align-accent/20">
        View Full Calendar
      </Button>
    </div>
  );
};

export default CalendarWidget;
