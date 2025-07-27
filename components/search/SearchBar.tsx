import { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

interface SearchBarProps {
  onSearch: (params: {
    location: string;
    sportType: string;
    date: string;
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState('');
  const [sportType, setSportType] = useState('');
  const [date, setDate] = useState('');

  const sportTypes = [
    'All Sports',
    'Basketball',
    'Tennis',
    'Soccer',
    'Volleyball',
    'Badminton',
    'Pickleball'
  ];

  const handleSearch = () => {
    onSearch({
      location,
      sportType,
      date
    });
  };

  return (
    <div className="bg-secondary/80 p-4 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:bg-secondary">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-accent">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location..."
            className="w-full bg-secondary border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
          />
        </div>

        {/* Sport Type Select */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <select
            value={sportType}
            onChange={(e) => setSportType(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-yellow-500 transition-colors"
          >
            {sportTypes.map((sport) => (
              <option key={sport} value={sport.toLowerCase()}>
                {sport}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Date Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Search className="h-5 w-5" />
        Search Courts
      </button>
    </div>
  );
}
