import { useState } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const features = [
    {
      icon: '🎯',
      title: 'Court Finder',
      description: 'Find courts near you with filters'
    },
    {
      icon: '🎾',
      title: 'Gear Advice',
      description: 'Get personalized equipment recommendations'
    },
    {
      icon: '📅',
      title: 'Easy Booking',
      description: 'Book courts with just a few clicks'
    }
  ];

  const suggestedTopics = [
    'Find courts near me',
    'Recommend tennis gear',
    'Help me book a basketball court',
    'Compare court facilities'
  ];

  return (
    <div className="flex h-screen bg-primary">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-4 transition-all duration-300 hover:border-gray-700">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text-primary mb-2 font-heading">Recent Conversations</h2>
          <div className="space-y-2">
            <div className="p-2 rounded hover:bg-secondary cursor-pointer text-text-secondary text-sm transform transition-all duration-200 hover:translate-x-1 hover:text-accent">
              Basketball courts in Downtown
            </div>
            <div className="p-2 rounded hover:bg-secondary cursor-pointer text-text-secondary text-sm transform transition-all duration-200 hover:translate-x-1 hover:text-accent">
              Tennis racket recommendations
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Suggested Topics</h2>
          <div className="space-y-2">
            {suggestedTopics.map(topic => (
              <div
                key={topic}
                className="p-2 rounded hover:bg-gray-800 cursor-pointer text-gray-400 text-sm"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-black font-bold">AI</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Courty AI</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Welcome to Courty AI Assistant</h1>
            <p className="text-gray-400 mb-8">
              I&apos;m here to help you find the perfect sports courts, recommend gear, and assist with bookings.
              Just ask me anything related to sports facilities and equipment!
            </p>
            
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {features.map(feature => (
                <div key={feature.title} className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div
                className={`max-w-sm p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-yellow-500 text-black ml-auto'
                    : 'bg-gray-800 text-white'
                }`}
              >
                {message.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center bg-gray-900 rounded-lg p-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Courty AI anything..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
            <button className="ml-2 text-yellow-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
