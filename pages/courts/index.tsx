import React, { useState, useEffect } from 'react';
import { MapPin, Filter, Search as SearchIcon } from 'lucide-react';
import SearchBar from '../../components/search/SearchBar';
import FiltersSidebar from '../../components/search/FiltersSidebar';
import CourtCard from '../../components/courts/CourtCard';
import LiveMap from '../../components/maps/LiveMap';
import type { Court } from '../../types/courts';

const CourtsPage = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
    // Fetch courts data
    const fetchCourts = async () => {
      try {
        const response = await fetch('/api/courts');
        const data = await response.json();
        setCourts(data);
      } catch (error) {
        console.error('Error fetching courts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  const handleSearch = (params: { location: string; sportType: string; date: string }) => {
    setLoading(true);
    // Implement search logic here
    console.log('Search params:', params);
    setLoading(false);
  };

  const handleQuickBook = (court: Court) => {
    // Implement quick booking logic
    console.log('Quick booking court:', court);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Search Section */}
      <div className="relative h-64 bg-gradient-to-b from-secondary to-primary flex items-center justify-center px-4">
        <div className="max-w-7xl w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-accent text-black'
                    : 'text-text-secondary hover:bg-secondary'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-accent text-black'
                    : 'text-text-secondary hover:bg-secondary'
                }`}
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="text-text-secondary">
            {loading ? 'Loading...' : `${courts.length} courts found`}
          </div>
        </div>

        {/* Content Grid/Map */}
        <div className="flex">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 mr-8">
              <FiltersSidebar 
                filters={{
                  sportTypes: [],
                  amenities: [],
                  availability: [],
                  priceRange: { min: 0, max: 100 }
                }}
                onChange={(filters) => console.log('Filters changed:', filters)}
                onReset={() => console.log('Filters reset')}
              />
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  // Loading skeletons
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-secondary animate-pulse rounded-xl aspect-[4/3]"
                    />
                  ))
                ) : (
                  courts.map((court) => (
                    <CourtCard
                      key={court.id}
                      court={court}
                      onQuickBook={() => handleQuickBook(court)}
                    />
                  ))
                )}
              </div>
            ) : (
              <div className="h-[700px] rounded-xl overflow-hidden">
                <LiveMap
                  courts={courts}
                  loading={loading}
                  selectedCourt={selectedCourt}
                  onCourtSelect={setSelectedCourt}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourtsPage;