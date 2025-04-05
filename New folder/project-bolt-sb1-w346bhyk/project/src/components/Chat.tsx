import React, { useState } from 'react';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Select one of the queries given below that fits your needs.',
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      const botMessage = {
        sender: 'bot',
        text: data.response,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '⚠️ Error: Could not connect to the chatbot server.',
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setLoading(false);
  };

  const handleButtonClick = (question: string) => {
    setInput(question);
    setTimeout(() => sendMessage(), 100); // slight delay so input gets updated
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chatbox */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block p-2 rounded ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
            <div className="text-xs text-gray-500">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex p-2 border-t">
        <input
          className="flex-grow border rounded-l px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>

      {/* Suggested buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 mt-2">
        {[
          'Admission Process',
          'Course Information',
          'Faculty Details',
          'Campus Facilities',
          'Placements',
          'Contact Info',
        ].map((q) => (
          <button
            key={q}
            onClick={() => handleButtonClick(q)}
            className="bg-gray-800 text-white rounded p-2 hover:bg-gray-700"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chat;
