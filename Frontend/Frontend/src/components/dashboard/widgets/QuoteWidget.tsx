
import React, { useState, useEffect } from 'react';
import { Quote, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quotes = [
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey"
  }
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
    setQuote(getRandomQuote());
  }, []);
  
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Quote className="h-5 w-5 text-align-accent" />
          <h3 className="font-bold text-lg">Daily Quote</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-align-muted hover:text-white"
          onClick={handleRefreshQuote}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <div className="glass-card p-5 flex flex-col items-center text-center space-y-4">
        <Quote className="h-8 w-8 text-align-accent opacity-50" />
        
        <p className="text-lg italic font-medium">"{quote.text}"</p>
        
        <p className="text-align-muted">— {quote.author}</p>
      </div>
    </div>
  );
};

export default QuoteWidget;
