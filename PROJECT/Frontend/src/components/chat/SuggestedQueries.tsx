import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuggestedQueriesProps {
  onQueryClick: (query: string) => void;
}

const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ onQueryClick }) => {
  const [queries, setQueries] = useState<string[]>([]);

  useEffect(() => {
    // Simulating dynamic query loading (can be replaced with an API call)
    const fetchQueries = async () => {
      const academicQueries = [
        "What are the academic regulations for 2024?",
        "How can I access the syllabus for my course?",
        "What is the schedule for the next semester exams?",
        "How do I apply for a leave of absence?",
        "Who is the head of the CSE department?",
        "What are the library timings?",
        "How can I contact the placement cell?"
      ];
      setQueries(academicQueries);
    };

    fetchQueries();
  }, []);

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
            aria-label={`Suggested query: ${query}`}
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
