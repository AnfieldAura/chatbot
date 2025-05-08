import React, { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Event {
  id: number;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'meeting';
}

const events: Event[] = [
  { id: 1, title: 'Midterm Exam: Math 101', date: '2025-01-10', type: 'exam' },
  { id: 2, title: 'Research Paper Due', date: '2025-02-15', type: 'assignment' },
  { id: 3, title: 'Meeting with Academic Advisor', date: '2025-03-12', type: 'meeting' },
  { id: 4, title: 'Group Project Presentation', date: '2025-04-18', type: 'assignment' },
  { id: 5, title: 'Final Exam: History 202', date: '2025-05-22', type: 'exam' },
  { id: 6, title: 'Lab Experiment', date: '2025-06-05', type: 'meeting' },
  { id: 7, title: 'Assignment Submission', date: '2025-07-20', type: 'assignment' },
  { id: 8, title: 'Team Meeting', date: '2025-08-25', type: 'meeting' },
  { id: 9, title: 'Quiz: Physics', date: '2025-09-10', type: 'exam' },
  { id: 10, title: 'Project Deadline', date: '2025-10-15', type: 'assignment' },
  { id: 11, title: 'Seminar', date: '2025-11-05', type: 'meeting' },
  { id: 12, title: 'Final Exam: Chemistry', date: '2025-12-20', type: 'exam' },
];

const getDaysInMonth = (year: number, month: number): Date[] => {
  const days: Date[] = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const CalendarWidget: React.FC = () => {
  const [isFullCalendar, setIsFullCalendar] = useState(false);
  const today = new Date();
  const currentYear = today.getFullYear();

  const getEventForDate = (date: Date): Event | undefined => {
    const dateString = date.toISOString().split('T')[0];
    return events.find(event => event.date === dateString);
  };

  const renderMonthView = (month: number, year: number) => {
    const dates = getDaysInMonth(year, month);
    return (
      <div key={month} className="mb-6">
        <h4 className="font-bold text-2xl text-center">
          {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
        </h4>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-white text-xs py-1">
              {day}
            </div>
          ))}
          {dates.map((date, index) => {
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
                      event.type === 'exam' ? "bg-red-500" : // Red dot for exams
                      event.type === 'assignment' ? "bg-yellow-500" : // Yellow dot for assignments
                      "bg-green-500" // Green dot for meetings
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-card w-[900px] border border-blue-500 rounded-md ml-8">
      {isFullCalendar ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="border border-blue-500 rounded-md p-4 shadow-sm">
              {renderMonthView(i, currentYear)}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {renderMonthView(today.getMonth(), currentYear)}
        </div>
      )}

      <div>
        <h4 className="font-medium mb-4 text-lg">UPCOMING EVENTS</h4>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="p-4 rounded-md bg-align/50 hover:bg-align-accent/10">
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

      <Button
        variant="outline"
        className="w-full mt-4 bg-align-secondary border-align-secondary hover:bg-align-accent/20"
        onClick={() => setIsFullCalendar(!isFullCalendar)}
      >
        {isFullCalendar ? 'View Current Month' : 'View Full Calendar'}
      </Button>
    </div>
  );
};

export default CalendarWidget;