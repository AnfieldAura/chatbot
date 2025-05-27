import React, { useState } from "react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState(""); // Roll number input
  const [password, setPassword] = useState(""); // Password input
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5501/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        navigate("/AppLayout"); // Redirect to AppLayout
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Invalid roll number or password.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400">
      <div className="relative w-full max-w-xl bg-white/30 backdrop-blur-md p-12 rounded-lg shadow-lg border border-blue-500">
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md">
            <GraduationCap className="h-14 w-14 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-center text-white mb-8">
          STUDENT LOGIN
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="rollNumber"
              className="block text-lg font-medium text-white"
            >
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="mt-2 block w-full px-5 py-3 border border-blue-500 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg bg-white/70 backdrop-blur-md text-black"
              required
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg bg-white/70 backdrop-blur-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-md shadow hover:from-blue-700 hover:to-blue-900 transition text-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;