import React from 'react';
import { Court } from '../../types/courts';

interface LiveMapProps {
  courts: Court[];
  loading: boolean;
  selectedCourt: Court | null;
  onCourtSelect: (court: Court) => void;
}

export default function LiveMap({ courts, loading, selectedCourt, onCourtSelect }: LiveMapProps) {
  return (
    <div className="relative w-full h-full min-h-[500px] bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-accent/30">
      <div className="absolute inset-0 bg-primary/90">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 bg-black/80 rounded-lg p-3 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition-all duration-200 text-text-primary hover:text-accent transform hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Court Markers */}
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-yellow-500/20 rounded-full animate-ping"></div>
            <div className="w-6 h-6 bg-yellow-500/50 rounded-full animate-pulse"></div>
          </div>
        ) : (
          courts.map((court) => (
            <div
              key={court.id}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div
                className={`relative group cursor-pointer ${
                  selectedCourt?.id === court.id ? 'scale-110' : ''
                }`}
                onClick={() => onCourtSelect(court)}
              >
                <div className={`w-6 h-6 rounded-full animate-ping absolute ${
                  court.availability === 'available' ? 'bg-green-500/50' :
                  court.availability === 'busy' ? 'bg-yellow-500/50' :
                  'bg-red-500/50'
                }`}></div>
                <div className={`w-6 h-6 rounded-full relative flex items-center justify-center ${
                  court.availability === 'available' ? 'bg-green-500' :
                  court.availability === 'busy' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                  <span className="text-xs">{court.type === 'basketball' ? '🏀' : '🎾'}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                    {court.name}
                    <div className="text-xs text-gray-400">{court.location.address}</div>
                  </div>
                  <div className="border-8 border-transparent border-t-black/90 w-0 h-0 absolute left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Status Legend */}
        <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-4 text-sm text-white">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Busy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
