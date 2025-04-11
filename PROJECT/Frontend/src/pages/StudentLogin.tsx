import React, { useState } from "react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber: email }), // Dynamically sending roll number
      });

      if (response.ok) {
        const data = await response.json();
        if (data.attendancePercentage) {
          navigate("/layout"); // Redirect to AppLayout
        } else {
          setError("Attendance data not found for the provided roll number.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Invalid roll number or server error.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <GraduationCap className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-2">
          Student Login
        </h1>
        <p className="text-center text-blue-600 mb-6">
          Access your personalized learning dashboard
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className={`absolute left-3 top-2.5 text-gray-500 text-sm transition-all ${
                email ? "text-xs -top-2.5 text-blue-600" : ""
              }`}
            >
              Your roll number (ex. 23BD1A6621)
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Default password is Kmit123$"
              required
            />
            <div className="text-right mt-1">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        
        <div className="text-center mt-4">
          <a
            href="/align"
            className="text-sm text-blue-600 hover:underline flex items-center justify-center"
          >
            &larr; Back to selection
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
