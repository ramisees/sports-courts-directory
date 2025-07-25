
"use client";
// ...existing code...


"use client";
import { useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState('');
  const [sportFilter, setSportFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏀</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Sports Courts Directory
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-orange-400 transition-colors">Courts</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Sports</a>
              <a href="#" className="hover:text-orange-400 transition-colors">About</a>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all">
                Add Court
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Search */}
      <section className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Find Sports Courts Near You
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Discover basketball, tennis, pickleball, volleyball, and more courts in your area.
          </p>
          {/* Advanced Search */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-gray-700/50 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <select
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
                className="bg-gray-700/50 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-orange-500"
              >
                <option value="all">All Sports</option>
                <option value="basketball">🏀 Basketball</option>
                <option value="tennis">🎾 Tennis</option>
                <option value="pickleball">🏓 Pickleball</option>
                <option value="volleyball">🏐 Volleyball</option>
              </select>
              <select className="bg-gray-700/50 text-white px-4 py-3 rounded-lg border border-gray-600">
                <option>Distance</option>
                <option>1 mile</option>
                <option>5 miles</option>
                <option>10 miles</option>
              </select>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105">
                Search Courts
              </button>
            </div>
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button className="bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 px-3 py-1 rounded-full text-sm transition-all">
                🆓 Free Courts
              </button>
              <button className="bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 px-3 py-1 rounded-full text-sm transition-all">
                💡 Lighted
              </button>
              <button className="bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 px-3 py-1 rounded-full text-sm transition-all">
                🅿️ Parking
              </button>
              <button className="bg-gray-700/50 hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500 px-3 py-1 rounded-full text-sm transition-all">
                🏢 Indoor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Courts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Court Card 1 */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all hover:transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">🏀 Basketball</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Available</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Central Park Courts</h3>
                <p className="text-gray-400 mb-3">Downtown • 0.3 miles away</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <span className="text-gray-400 ml-2">(24 reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">💡 Lighted</span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">🅿️ Parking</span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">🆓 Free</span>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all">
                  View Details
                </button>
              </div>
            </div>

            {/* Court Card 2 */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all hover:transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-green-600 to-teal-600 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">🎾 Tennis</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs">Busy</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tennis Club Pro</h3>
                <p className="text-gray-400 mb-3">Midtown • 1.2 miles away</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <span className="text-gray-400 ml-2">(56 reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">🏢 Indoor</span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">🅿️ Parking</span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">💰 $15/hr</span>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all">
                  View Details
                </button>
              </div>
            </div>

            {/* Court Card 3 */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all hover:transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">🏓 Pickleball</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Available</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Community Center</h3>
                <p className="text-gray-400 mb-3">Northside • 2.1 miles away</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">⭐⭐⭐⭐☆</div>
                  <span className="text-gray-400 ml-2">(12 reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">🌞 Outdoor</span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">🅿️ Parking</span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">🆓 Free</span>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of players finding the perfect courts for their game.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105">
            Start Searching
          </button>
        </div>
      </section>
    </div>
  );
}
