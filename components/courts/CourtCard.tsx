import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import type { Court } from '../../types/courts';

interface CourtCardProps {
  court: Court & {
    location: {
      lat: number;
      lng: number;
      address: string;
      distance?: number;
    };
  };
  onQuickBook?: () => void;
}

export default function CourtCard({ court, onQuickBook }: CourtCardProps) {
  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case 'available':
        return { color: 'bg-emerald-500', text: 'Available' };
      case 'limited':
        return { color: 'bg-amber-500', text: 'Limited' };
      case 'booked':
        return { color: 'bg-red-500', text: 'Booked' };
      default:
        return { color: 'bg-gray-500', text: 'Unknown' };
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="court-card group bg-secondary rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={court.images[0]}
          alt={court.name}
          className="transition-transform duration-500 group-hover:scale-110"
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Sport Type Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm">
          {court.type}
        </div>
        
        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex mr-1">
            {renderStars(court.rating)}
          </div>
          <span className="text-white text-sm">{court.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-white mb-1">{court.name}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{court.location.address}</span>
            <span className="mx-2">•</span>
            <span>{court.location.distance} miles</span>
          </div>
        </div>

          {/* Price and Availability */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">${court.pricePerHour}</span>
            <span className="text-gray-400 text-sm ml-1">/hour</span>
          </div>
          
          {/* Availability Badge */}
          {(() => {
            const badge = getAvailabilityBadge(court.availability);
            return (
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color} text-white`}>
                {badge.text}
              </div>
            );
          })()}</div>        {/* Quick Book Button */}
        <button
          onClick={onQuickBook}
          className="w-full mt-4 bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Quick Book
        </button>

        {/* Amenities */}
        <div className="mt-4 flex gap-2">
          {court.amenities.map((amenity, index) => (
            <div key={index} className="text-gray-400 bg-gray-800 rounded-full px-2 py-1 text-xs">
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
