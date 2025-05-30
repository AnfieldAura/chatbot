import React, { useState, useEffect } from 'react';
import { ArrowLeft, Quote, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarWidget from './widgets/CalendarWidget';
import AttendanceWidget from './widgets/AttendanceWidget';
import MaterialsWidget from './widgets/MaterialsWidget';
import TimeTableWidget from './widgets/TimeTableWidget';

interface DashboardProps {
  activeWidget: string | null;
  onBackClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeWidget, onBackClick }) => {
  const [localActiveWidget, setLocalActiveWidget] = useState<string | null>(activeWidget);

  const handleBackClick = () => {
    setLocalActiveWidget(null);
    onBackClick();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-t-2 border-b-2 border-blue-500 flex items-center">
        {localActiveWidget && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="mr-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h2 className="text-xl font-bold mb-0 mt-1">
          {localActiveWidget ? localActiveWidget.toUpperCase() : 'Dashboard'}
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Calendar Widget */}
          {localActiveWidget === 'calendar' || !localActiveWidget ? (
            <div className={`${!localActiveWidget ? 'md:col-span-2' : ''}`}>
              <CalendarWidget />
            </div>
          ) : null}

          {/* Daily Quote Widget */}
{/*
{localActiveWidget === 'dailyQuote' || !localActiveWidget ? (
  <div>
    <QuoteWidget />
  </div>
) : null}
*/}

          {/* TimeTable Widget */}
          {localActiveWidget === 'timetable' || !localActiveWidget ? (
            <div>
              <TimeTableWidget />
            </div>
          ) : null}

          {/* Materials Widget */}
          {localActiveWidget === 'materials' || !localActiveWidget ? (
            <div>
              <MaterialsWidget />
            </div>
          ) : null}
          
          {/* Attendance Widget */}
          {localActiveWidget === 'attendance' || !localActiveWidget ? (
            <div>
              <AttendanceWidget />
            </div>
          ) : null}

          {/* Daily Quote Widget */}
          {localActiveWidget === 'dailyQuote' || !localActiveWidget ? (
            <div>
              <QuoteWidget />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const quotes = [
  {
    text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
    author: 'Malcolm X',
  },
  {
    text: 'The beautiful thing about learning is that no one can take it away from you.',
    author: 'B.B. King',
  },
  {
    text: 'Education is not the filling of a pail, but the lighting of a fire.',
    author: 'W.B. Yeats',
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: 'Dr. Seuss',
  },
  {
    text: 'Education is not preparation for life; education is life itself.',
    author: 'John Dewey',
  },
];

const QuoteWidget: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleRefreshQuote = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      const newQuote = getRandomQuote();
      setQuote(newQuote);
      setIsRefreshing(false);
    }, 800);
  };

  // Set initial random quote on component mount
  useEffect(() => {
    const initialQuote = getRandomQuote();
    setQuote(initialQuote);
  }, []);

  return (
    <div className="dashboard-card p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Quote className="h-5 w-5 text-blue-500" />
          <h3 className="font-bold text-lg text-white">Daily Quote</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500 hover:text-white"
          onClick={handleRefreshQuote}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="glass-card p-5 flex flex-col items-center text-center space-y-4">
        <Quote className="h-8 w-8 text-blue-500 opacity-50" />
        <p className="text-lg italic font-medium text-white">"{quote.text}"</p>
        <p className="text-blue-400">— {quote.author}</p>
      </div>
    </div>
  );
};

export default Dashboard;