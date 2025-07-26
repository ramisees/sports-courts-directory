import { useState } from 'react';
import { ErrorBoundary } from '../../components/ui/ErrorBoundary';
import Navigation from '../../components/ui/Navigation';
import CourtSearch from '../../components/search/CourtSearch';
import LiveMap from '../../components/maps/LiveMap';
import { useCourtSearch } from '../../hooks/useCourtSearch';
import type { Court, SearchFilters } from '../../types/courts';

export default function CourtsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    courts,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
  } = useCourtSearch();

  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    updateFilters(newFilters);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#121212]">
        <Navigation />

        <div className="pt-16 flex">
          {/* Sidebar */}
          <div 
            className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black bg-opacity-95 border-r border-gray-800 transition-all duration-300 z-40
              ${isSidebarOpen ? 'w-80' : 'w-0'}`}
          >
            <div className="relative h-full">
              {/* Toggle Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute -right-4 top-4 bg-yellow-500 text-black p-1 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
              >
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Search Interface */}
              <div className={`h-full overflow-y-auto ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                <CourtSearch 
                  loading={loading}
                  error={error}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={resetFilters}
                  courts={courts}
                  selectedCourt={selectedCourt}
                  onCourtSelect={handleCourtSelect}
                />
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div 
            className={`flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)]
              ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}
          >
            <LiveMap
              courts={courts}
              loading={loading}
              selectedCourt={selectedCourt}
              onCourtSelect={handleCourtSelect}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
