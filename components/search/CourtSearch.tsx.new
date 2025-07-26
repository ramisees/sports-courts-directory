import React, { useState } from 'react';

export default function CourtSearch() {
  const [selectedSport, setSelectedSport] = useState('all');

  const sports = [
    { id: 'all', label: 'All Sports', icon: '🎯' },
    { id: 'basketball', label: 'Basketball', icon: '🏀' },
    { id: 'tennis', label: 'Tennis', icon: '🎾' },
    { id: 'golf', label: 'Golf', icon: '⛳' },
    { id: 'rugby', label: 'Rugby', icon: '🏉' },
    { id: 'swimming', label: 'Swimming', icon: '🏊‍♂️' }
  ];

  const amenities = [
    { id: 'parking', label: 'Parking', icon: '🅿️' },
    { id: 'lighted', label: 'Lighted', icon: '💡' },
    { id: 'indoor', label: 'Indoor', icon: '🏢' },
    { id: 'lockers', label: 'Lockers', icon: '🔒' },
    { id: 'showers', label: 'Showers', icon: '🚿' }
  ];

  return (
    <aside className="w-[420px] h-screen bg-black border-l border-gray-800 overflow-y-auto fixed right-0 top-16">
      <div className="p-8">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Find Courts</h2>
          <button className="text-yellow-500 hover:text-yellow-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* Search Box */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search courts, locations, or amenities..."
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sports.map(sport => (
            <button
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2
                ${selectedSport === sport.id 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-800/50 text-white hover:bg-yellow-500 hover:text-black'}`}
            >
              <span>{sport.icon}</span>
              {sport.label}
            </button>
          ))}
        </div>

        {/* Time Selection */}
        <div className="mb-6">
          <h3 className="text-base text-gray-400 mb-3">When</h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors">
              Today
            </button>
            <button className="bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors">
              Tomorrow
            </button>
            <button className="bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors">
              This Week
            </button>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h3 className="text-base text-gray-400 mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map(amenity => (
              <button
                key={amenity.id}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-yellow-500 hover:text-black transition-colors"
              >
                <span>{amenity.icon}</span>
                {amenity.label}
              </button>
            ))}
          </div>
        </div>

        {/* Available Courts */}
        <div className="space-y-4">
          {[1, 2].map(index => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-white font-medium mb-1">Central Park Courts {index}</h4>
                  <p className="text-gray-400 text-sm">Downtown • {index * 0.3} miles away</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  index === 1 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                }`}>
                  {index === 1 ? 'Available' : 'Busy'}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="bg-gray-700/50 text-xs text-gray-300 px-2 py-1 rounded">🏀 Basketball</span>
                <span className="bg-gray-700/50 text-xs text-gray-300 px-2 py-1 rounded">💡 Lighted</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
