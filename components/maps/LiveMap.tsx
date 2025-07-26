import React, { useEffect, useRef, useCallback } from 'react';
import { Court, SearchFilters } from '../../types/courts';
import type { Map, LayerGroup, DivIcon, Marker, LatLngBounds, LatLng } from 'leaflet';

interface LiveMapProps {
  courts: Court[];
  loading: boolean;
  selectedCourt: Court | null;
  onCourtSelect: (court: Court) => void;
  filters: SearchFilters;
}

declare global {
  interface Window {
    L: typeof import('leaflet');
  }
}

export default function LiveMap({ 
  courts, 
  loading, 
  selectedCourt, 
  onCourtSelect,
  filters 
}: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<Map | null>(null);
  const markersLayer = useRef<LayerGroup | null>(null);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
      if (leafletMap.current) {
        leafletMap.current.remove();
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || leafletMap.current) return;

    // Initialize the map
    leafletMap.current = window.L.map(mapRef.current).setView([40.7128, -74.0060], 13);

    // Add the tile layer (you can use different map styles)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap.current);

    // Initialize the markers layer
    markersLayer.current = window.L.layerGroup().addTo(leafletMap.current);
  };

  useEffect(() => {
    if (!leafletMap.current || !markersLayer.current) return;

    // Clear existing markers
    markersLayer.current.clearLayers();

    // Add markers for each court
    courts.forEach(court => {
      const isSelected = selectedCourt?.id === court.id;
      
      // Create custom icon
      const icon = window.L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="${isSelected ? 'ring-2 ring-yellow-500' : ''} relative group">
            <div class="w-6 h-6 ${
              court.availability === 'available' ? 'bg-green-500' :
              court.availability === 'busy' ? 'bg-yellow-500' :
              'bg-red-500'
            } rounded-full flex items-center justify-center">
              ${getCourtIcon(court.type)}
            </div>
          </div>
        `,
      });

      // Create marker
      const marker = window.L.marker([court.location.lat, court.location.lng], { icon })
        .addTo(markersLayer.current)
        .on('click', () => onCourtSelect(court));

      // Add popup with booking information
      marker.bindPopup(`
        <div class="p-3 min-w-[300px]">
          <h3 class="font-medium text-lg mb-1">${court.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${court.location.address}</p>
          
          <div class="space-y-3 border-t border-gray-200 pt-2">
            {/* Status and Price */}
            <div class="flex items-center justify-between">
              <span class="px-2 py-1 rounded-full text-xs font-medium ${
                court.availability === 'available' ? 'bg-green-100 text-green-800' :
                court.availability === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }">
                ${court.availability.charAt(0).toUpperCase() + court.availability.slice(1)}
              </span>
              <span class="text-sm font-medium">$${court.pricePerHour}/hour</span>
            </div>

            {/* Hours and Contact */}
            <div class="space-y-2">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Hours: ${court.contact.hours.open} - ${court.contact.hours.close}</span>
              </div>
              
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>${court.contact.phone}</span>
              </div>
            </div>

            {/* Amenities */}
            <div class="space-y-1">
              <h4 class="text-sm font-medium">Amenities:</h4>
              <div class="flex flex-wrap gap-1">
                ${court.amenities.map(amenity => `
                  <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    ${amenity.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                `).join('')}
              </div>
            </div>

            {/* Booking Methods */}
            <div class="space-y-1">
              <h4 class="text-sm font-medium">How to Book:</h4>
              <div class="flex flex-wrap gap-1">
                ${court.contact.bookingMethods.map(method => `
                  <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    ${method.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}
                  </span>
                `).join('')}
              </div>
              ${court.contact.instructions ? `
                <p class="text-xs text-gray-600 mt-1">${court.contact.instructions}</p>
              ` : ''}
            </div>

            {/* Action Buttons */}
            <div class="flex items-center space-x-2 pt-2">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=${court.location.lat},${court.location.lng}" 
                target="_blank" 
                class="flex-1 bg-blue-500 text-white text-sm px-3 py-1.5 rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Directions
              </a>
              ${court.contact.phone ? `
                <a 
                  href="tel:${court.contact.phone.replace(/[^0-9]/g, '')}" 
                  class="flex-1 bg-green-500 text-white text-sm px-3 py-1.5 rounded flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              ` : ''}
            </div>

            {/* Social Media */}
            ${court.social ? `
              <div class="flex items-center justify-center space-x-3 pt-2 border-t border-gray-200">
                ${court.social.website ? `
                  <a href="${court.social.website}" target="_blank" class="text-gray-600 hover:text-blue-500">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.477 10-10c0-5.524-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                    </svg>
                  </a>
                ` : ''}
                ${court.social.instagram ? `
                  <a href="https://instagram.com/${court.social.instagram}" target="_blank" class="text-gray-600 hover:text-pink-500">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                    </svg>
                  </a>
                ` : ''}
                ${court.social.facebook ? `
                  <a href="https://facebook.com/${court.social.facebook}" target="_blank" class="text-gray-600 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `);
    });

    // If there's a selected court, center the map on it
    if (selectedCourt) {
      leafletMap.current.setView(
        [selectedCourt.location.lat, selectedCourt.location.lng],
        15
      );
    }
    // Otherwise fit bounds to show all courts
    else if (courts.length > 0) {
      const bounds = window.L.latLngBounds(
        courts.map(court => [court.location.lat, court.location.lng])
      );
      leafletMap.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [courts, selectedCourt, onCourtSelect]);

  // Helper function to get court type icon
  const getCourtIcon = (type: string) => {
    switch (type) {
      case 'basketball':
        return '🏀';
      case 'tennis':
        return '🎾';
      case 'volleyball':
        return '🏐';
      case 'football':
        return '⚽';
      default:
        return '🏟️';
    }
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-[calc(100vh-4rem)]"
      >
        {/* Map will be rendered here */}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-80 rounded-lg p-2 space-y-2">
        <button 
          onClick={() => leafletMap.current?.zoomIn()}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button 
          onClick={() => leafletMap.current?.zoomOut()}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
          </svg>
        </button>
        <button 
          onClick={() => {
            if (courts.length > 0) {
              const bounds = window.L.latLngBounds(
                courts.map(court => [court.location.lat, court.location.lng])
              );
              leafletMap.current?.fitBounds(bounds, { padding: [50, 50] });
            }
          }}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h.01M7 12h.01M11 12h.01M15 12h.01M19 12h.01M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-20h2a2 2 0 012 2v2m0 12v2a2 2 0 01-2 2h-2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
