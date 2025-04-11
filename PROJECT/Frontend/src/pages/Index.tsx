import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 text-center">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
        Welcome to Pathway Connect
      </h1>
      <p className="text-lg text-blue-600 mb-6">
        Your platform for educational alignment and success
      </p>
      <Link
        to="/align"
        className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Index;
