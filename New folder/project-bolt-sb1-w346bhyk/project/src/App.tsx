import React from 'react';
import Chat from './components/Chat'; // ✅ Adjust path if needed

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white text-black rounded-lg shadow-lg p-4">
        <h1 className="text-center text-3xl font-bold mb-4">ALIGN</h1>
        <h2 className="text-center text-xl font-semibold mb-6">I AM YOUR COLLEGE CHATBOT!</h2>
        <Chat />
      </div>
    </div>
  );
}

export default App;
