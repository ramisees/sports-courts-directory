"use client";

import React from 'react';

export default function CourtSearch() {
  return (
    <aside className="w-[420px] h-screen bg-black border-l border-gray-800 overflow-y-auto fixed right-0 top-16">
      <div className="p-8">
        {/* Find Courts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Find Courts</h2>
          
          {/* Search with Application */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-3">Search with Application</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your search here..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
              />
              <button className="absolute right-2 top-2 bg-yellow-500 text-black px-3 py-1 rounded text-sm">
                Search
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="px-4 py-1.5 bg-gray-800 text-white rounded-full text-sm hover:bg-yellow-500 hover:text-black transition-colors">
              Separate
            </button>
            <button className="px-4 py-1.5 bg-gray-800 text-white rounded-full text-sm hover:bg-yellow-500 hover:text-black transition-colors">
              Basketball
            </button>
            <button className="px-4 py-1.5 bg-gray-800 text-white rounded-full text-sm hover:bg-yellow-500 hover:text-black transition-colors">
              Golf ball
            </button>
            <button className="px-4 py-1.5 bg-gray-800 text-white rounded-full text-sm hover:bg-yellow-500 hover:text-black transition-colors">
              US Rugby
            </button>
          </div>

          {/* Court Examples */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-3">Court Examples</h3>
            <div className="grid gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Availability Courts</span>
                  <span className="bg-green-500 text-xs text-white px-2 py-1 rounded-full">Open</span>
                </div>
                <p className="text-gray-400 text-sm">Downtown • 0.5 miles</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Courty Center</span>
                  <span className="bg-yellow-500 text-xs text-black px-2 py-1 rounded-full">Busy</span>
                </div>
                <p className="text-gray-400 text-sm">Uptown • 1.2 miles</p>
              </div>
            </div>
          </div>

          {/* Search Court Function */}
                    {/* Search Court Function */}
          <div className="mb-6">
            <h3 className="text-base text-gray-400 mb-4">Search Court Function</h3>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Court Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Peak Hours</span>
                  <span className="text-gray-400 text-sm">2:00 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Current Usage</span>
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-yellow-500"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Weather</span>
                  <span className="text-gray-400 text-sm">🌤️ 72°F Clear</span>
                </div>
                <button className="w-full bg-yellow-500 text-black py-2.5 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="mb-6">
            <h3 className="text-base text-gray-400 mb-4">Quick Filters</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-yellow-500 hover:text-black transition-colors flex items-center gap-2">
                <span>⭐</span> Top Rated
              </button>
              <button className="px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-yellow-500 hover:text-black transition-colors flex items-center gap-2">
                <span>🅿️</span> Free Parking
              </button>
              <button className="px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-yellow-500 hover:text-black transition-colors flex items-center gap-2">
                <span>💡</span> Lighted
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
