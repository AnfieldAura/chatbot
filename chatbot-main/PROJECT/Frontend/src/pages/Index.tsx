import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 text-center overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#3b82f6"
            fillOpacity="1"
            d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,176C672,160,768,128,864,122.7C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg transform transition hover:scale-105 border-4 border-blue-800">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-white">ALIGN</span>
        </h1>
        <p className="text-lg text-white mb-8">
          Your platform for educational alignment and success. Start your journey
          today!
        </p>
        {/* Center the Bot Icon and Button */}
        <div className="flex flex-col items-center">
          <img
            src="Bot-Icon.gif"
            alt="Bot Icon"
            className="w-50 h-40 mb-6"
          />
          <Link
            to="/align"
            className="mt-4 px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
