"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import CourtSearch from '../../components/search/CourtSearch';

const LiveMap = dynamic(() => import('../../components/maps/LiveMap'), { ssr: false });

export default function Home() {
  const [location, setLocation] = useState('');
  const [sportFilter, setSportFilter] = useState('all');

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
        {/* Hero Section with Search - Redesigned */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Left Side - Hero Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-white">Sair Courts</span>
                <br />
                <span className="text-yellow-500">Ad Soarts Findersion</span>
              </h1>
              <p className="text-gray-400 text-xl">
                Find the finest courts and their routes to other cities
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Court, location, or feature"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-white"
              />
              <button className="bg-yellow-500 text-black px-6 py-3 rounded-r-lg hover:bg-yellow-400">
                Search
              </button>
            </div>

            {/* Features */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-yellow-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Courts timing
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 12.414a1.998 1.998 0 01-2.827-2.827l-7.778-7.778a1 1 0 00-1.414 1.414l7.778 7.778a1.998 1.998 0 012.827 2.827l4.243 4.243a1 1 0 001.414 0z" />
                </svg>
                Locations
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="relative min-h-[400px] bg-gray-800 rounded-lg overflow-hidden">
            <LiveMap />
          </div>
        </section>

        {/* Features List */}
        <section className="py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
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
    </div>
  );
}