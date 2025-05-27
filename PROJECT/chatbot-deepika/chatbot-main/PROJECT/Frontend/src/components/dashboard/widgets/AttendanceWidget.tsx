import React, { useState } from 'react';
import { Award } from 'lucide-react';

const AttendanceWidget: React.FC<{
  onActivate?: () => void;
  onDeactivate?: () => void;
}> = ({ onActivate, onDeactivate }) => {
  return (
    <div
      className="dashboard-card bg-[#2a2a40] p-6 rounded-xl shadow-md w-full max-w-md"
      role="region"
      aria-labelledby="attendance-widget-title"
      onClick={onActivate} // Notify activation
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-white">
        <Award className="h-5 w-5 text-purple-400" />
        <h3 id="attendance-widget-title" className="font-bold text-lg">
          Attendance Record
        </h3>
      </div>

      {/* Input and Button */}
      {/* ...existing code... */}
    </div>
  );
};

export default AttendanceWidget;
