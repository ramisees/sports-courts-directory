
"use client";
// ...existing code...


"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('../../components/maps/LiveMap'), { ssr: false });

export default function Home() {
  const [location, setLocation] = useState('');
  const [sportFilter, setSportFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section with Search - Redesigned */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-black text-white pb-16 pt-32">
        {/* Logo */}
        <img src="/logo.png" alt="Courts Finders Logo" className="w-40 h-40 mb-6 drop-shadow-xl" />
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-4 tracking-tight leading-tight">
          <span className="block text-white">Sair Courts</span>
          <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Ad Soarts Findersion</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 text-center max-w-2xl mb-8">
          Find other courts and their routes to other cities
        </p>
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center w-full max-w-2xl gap-4 mb-6">
          <input
            type="text"
            placeholder="Court, location, or feature"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-6 py-4 rounded-l-2xl md:rounded-l-2xl md:rounded-r-none rounded-r-2xl bg-gray-900 border-2 border-gray-700 focus:border-yellow-400 text-lg placeholder-gray-400 outline-none shadow-lg"
          />
          <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-r-2xl md:rounded-r-2xl md:rounded-l-none rounded-l-2xl text-lg shadow-lg transition-all flex items-center gap-2">
            <span>Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>
        {/* Features List */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-2">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            Owners Routing
          </div>
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a6 6 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
            </svg>
            Locations
          </div>
        </div>
      </section>


      {/* Live Map Section */}
      <LiveMap />

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
