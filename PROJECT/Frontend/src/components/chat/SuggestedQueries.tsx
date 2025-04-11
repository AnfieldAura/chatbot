import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuggestedQueriesProps {
  onQueryClick: (query: string) => void;
}

const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ onQueryClick }) => {
  const queries = [
    "When is the next exam?",
    "How do I register for classes?",
    "What's my attendance record?",
    "How can I contact my advisor?"
  ];

  const handleQueryClick = (query: string) => {
    onQueryClick(query);
    setTimeout(() => {
      document.getElementById("submitButton")?.click(); // Trigger send button
    }, 300);
  };

  return (
    <div>
      <p className="text-sm text-align-muted mb-2">Suggested queries:</p>
      <div className="flex flex-wrap gap-2">
        {queries.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="bg-align-secondary border-align-secondary hover:bg-align-accent/20 text-align-foreground"
            onClick={() => handleQueryClick(query)}
          >
            {query}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQueries;
