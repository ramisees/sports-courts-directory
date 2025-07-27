"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side with logo and navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl text-yellow-500">∞</span>
              <span className="text-xl font-semibold text-white">Courty</span>
            </Link>
            
            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/courts" className="text-gray-300 hover:text-yellow-500 transition-colors">Courts</Link>
              <Link href="/benefits" className="text-gray-300 hover:text-yellow-500 transition-colors">Benefits</Link>
              <Link href="/sports" className="text-gray-300 hover:text-yellow-500 transition-colors">Sports</Link>
              <Link href="/support" className="text-gray-300 hover:text-yellow-500 transition-colors">Support</Link>
              <Link href="/forums" className="text-gray-300 hover:text-yellow-500 transition-colors">Forums</Link>
            </div>
          </div>

          {/* Right side navigation and buttons */}
          <div className="flex items-center space-x-6">
            {/* Search Button */}
            <button className="text-gray-300 hover:text-yellow-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Additional navigation items */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/games" className="text-gray-300 hover:text-yellow-500 transition-colors">Games</Link>
              <Link href="/anithem" className="text-gray-300 hover:text-yellow-500 transition-colors">Anithem</Link>
              <Link href="/hatters" className="text-gray-300 hover:text-yellow-500 transition-colors">Hatters</Link>
            </div>

            {/* Notifications */}
            <button className="text-gray-300 hover:text-yellow-500 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/sign-in" 
                className="text-gray-300 hover:text-yellow-500 transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link 
                href="/for-rent" 
                className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400 transition-colors font-medium"
              >
                For Rent
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-300 hover:text-yellow-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/centers" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Centers</Link>
            <Link href="/benefits" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Benefits</Link>
            <Link href="/events" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Events</Link>
            <Link href="/bags" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Bags</Link>
            <Link href="/forum" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Forum</Link>
            <Link href="/courts" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Courts</Link>
            <Link href="/games" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Games</Link>
            <Link href="/anithem" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Anithem</Link>
            <Link href="/hatters" className="block text-gray-300 hover:text-yellow-500 transition-colors py-2">Hatters</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

