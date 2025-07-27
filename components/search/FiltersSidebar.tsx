import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersSidebarProps {
  filters: {
    sportTypes: string[];
    amenities: string[];
    availability: string[];
    priceRange: { min: number; max: number };
  };
  onChange: (filters: any) => void;
  onReset: () => void;
}

export default function FiltersSidebar({ filters, onChange, onReset }: FiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    sportType: true,
    amenities: true,
    availability: true,
    priceRange: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ 
    title, 
    section,
    children 
  }: { 
    title: string;
    section: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-800 py-4">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between text-white mb-4"
      >
        <span className="text-sm font-medium">{title}</span>
        {expandedSections[section] ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {expandedSections[section] && children}
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      {/* Header with Reset */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <button
          onClick={onReset}
          className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Sport Type */}
      <FilterSection title="Sport Type" section="sportType">
        <div className="space-y-2">
          {['Basketball', 'Tennis', 'Soccer', 'Volleyball', 'Badminton', 'Pickleball'].map((sport) => (
            <label key={sport} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.sportTypes.includes(sport.toLowerCase())}
                onChange={(e) => {
                  const newSportTypes = e.target.checked
                    ? [...filters.sportTypes, sport.toLowerCase()]
                    : filters.sportTypes.filter(s => s !== sport.toLowerCase());
                  onChange({ ...filters, sportTypes: newSportTypes });
                }}
                className="form-checkbox h-4 w-4 text-yellow-500 rounded border-gray-600 bg-gray-700 focus:ring-yellow-500 focus:ring-offset-gray-900"
              />
              <span className="text-sm text-gray-300">{sport}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Amenities */}
      <FilterSection title="Amenities" section="amenities">
        <div className="grid grid-cols-2 gap-2">
          {['Lighting', 'Parking', 'Showers', 'Lockers', 'Water', 'Equipment'].map((amenity) => (
            <label key={amenity} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity.toLowerCase())}
                onChange={(e) => {
                  const newAmenities = e.target.checked
                    ? [...filters.amenities, amenity.toLowerCase()]
                    : filters.amenities.filter(a => a !== amenity.toLowerCase());
                  onChange({ ...filters, amenities: newAmenities });
                }}
                className="form-checkbox h-4 w-4 text-yellow-500 rounded border-gray-600 bg-gray-700 focus:ring-yellow-500 focus:ring-offset-gray-900"
              />
              <span className="text-sm text-gray-300">{amenity}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" section="availability">
        <div className="flex flex-wrap gap-2">
          {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
            <button
              key={time}
              onClick={() => {
                const newAvailability = filters.availability.includes(time.toLowerCase())
                  ? filters.availability.filter(t => t !== time.toLowerCase())
                  : [...filters.availability, time.toLowerCase()];
                onChange({ ...filters, availability: newAvailability });
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.availability.includes(time.toLowerCase())
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" section="priceRange">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>${filters.priceRange.min}</span>
            <span>${filters.priceRange.max}+</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={filters.priceRange.max}
            onChange={(e) => {
              onChange({
                ...filters,
                priceRange: {
                  min: 0,
                  max: parseInt(e.target.value)
                }
              });
            }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
        </div>
      </FilterSection>

      {/* Applied Filters Summary */}
      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-medium text-white">Applied Filters</h3>
        <div className="flex flex-wrap gap-2">
          {filters.sportTypes.map((sport) => (
            <span key={sport} className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-black">
              {sport}
            </span>
          ))}
          {filters.amenities.map((amenity) => (
            <span key={amenity} className="px-2 py-1 text-xs rounded-full bg-gray-800 text-white">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
