import React, { useState } from 'react';
import { Award, Loader, AlertCircle } from 'lucide-react';

const AttendanceWidget: React.FC = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [attendanceData, setAttendanceData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    if (!rollNumber.trim()) {
      setError('Please enter a valid roll number.');
      setAttendanceData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setAttendanceData(null);

    try {
      const response = await fetch('http://localhost:5000/get-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNumber: rollNumber }),
      });

      const data = await response.json();

      if (response.ok && data.attendance) {
        setAttendanceData(data.attendance);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Unexpected response. Please check the backend.');
      }
    } catch (err) {
      setError('Failed to fetch attendance data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="dashboard-card bg-[#2a2a40] p-6 rounded-xl shadow-md w-full max-w-md"
      role="region"
      aria-labelledby="attendance-widget-title"
    >
      <div className="flex items-center gap-2 mb-4 text-white">
        <Award className="h-5 w-5 text-purple-400" />
        <h3 id="attendance-widget-title" className="font-bold text-lg">
          Attendance Record
        </h3>
      </div>

      <div className="mb-4">
        <label htmlFor="roll-number-input" className="sr-only">
          Roll Number
        </label>
        <input
          id="roll-number-input"
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="border border-gray-500 rounded-md px-4 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
          aria-invalid={!!error}
          aria-describedby={error ? 'error-message' : undefined}
        />
        <button
          onClick={fetchAttendance}
          disabled={loading}
          className={`btn-primary mt-3 w-full font-semibold py-2 rounded-md flex items-center justify-center gap-2 transition ${
            loading ? 'bg-gray-300 text-gray-700' : 'bg-white text-black hover:bg-gray-300'
          }`}
        >
          {loading && <Loader className="animate-spin h-5 w-5" />}
          {loading ? 'Fetching...' : 'Fetch Attendance'}
        </button>
      </div>

      {error && (
        <div
          id="error-message"
          className="text-red-400 text-sm mt-2 flex items-center gap-2"
          role="alert"
        >
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {attendanceData && (
        <p
          className="text-green-400 text-lg font-bold mt-2"
          role="status"
        >
          Attendance: {attendanceData}%
        </p>
      )}
    </div>
  );
};

export default AttendanceWidget;
