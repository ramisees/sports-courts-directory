import { NextApiRequest, NextApiResponse } from 'next';
import type { Court, SearchFilters } from '../../../types/courts';

// Simulated database of courts
const courts: Court[] = [
  {
    id: '1',
    name: 'Central Park Basketball Court',
    type: 'basketball',
    location: {
      lat: 40.785091,
      lng: -73.968285,
      address: 'Central Park, New York, NY'
    },
    amenities: ['lighting', 'water_fountain', 'seating'],
    availability: 'available',
    rating: 4.5,
    pricePerHour: 0,
    images: ['/courts/central-park-basketball.jpg'],
    contact: {
      phone: '(555) 123-4567',
      hours: {
        open: '06:00',
        close: '22:00'
      },
      bookingMethods: ['walk-in'],
      instructions: 'First come, first served. No reservations needed.'
    }
  },
  {
    id: '2',
    name: 'Chelsea Tennis Club',
    type: 'tennis',
    location: {
      lat: 40.748817,
      lng: -74.002533,
      address: '123 West St, New York, NY'
    },
    amenities: ['lighting', 'parking', 'restroom', 'locker_room', 'equipment_rental'],
    availability: 'busy',
    rating: 4.8,
    pricePerHour: 45,
    images: ['/courts/chelsea-tennis.jpg'],
    contact: {
      phone: '(555) 987-6543',
      hours: {
        open: '07:00',
        close: '21:00'
      },
      bookingMethods: ['phone', 'in-person'],
      instructions: 'Call ahead or visit the front desk to make a reservation. 24-hour cancellation policy applies.'
    }
  },
  // Add more sample courts here
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const filters: SearchFilters = req.body.filters || {};
    let filteredCourts = [...courts];

    // Apply filters
    if (filters.courtType?.length) {
      filteredCourts = filteredCourts.filter(court => 
        filters.courtType?.includes(court.type)
      );
    }

    if (filters.amenities?.length) {
      filteredCourts = filteredCourts.filter(court =>
        filters.amenities?.every(amenity => 
          court.amenities.includes(amenity)
        )
      );
    }

    if (filters.availability?.length) {
      filteredCourts = filteredCourts.filter(court =>
        filters.availability?.includes(court.availability)
      );
    }

    if (filters.priceRange) {
      filteredCourts = filteredCourts.filter(court =>
        court.pricePerHour >= filters.priceRange!.min &&
        court.pricePerHour <= filters.priceRange!.max
      );
    }

    if (filters.rating) {
      filteredCourts = filteredCourts.filter(court =>
        court.rating >= filters.rating!
      );
    }

    // Apply location-based filtering if coordinates and radius are provided
    if (filters.location) {
      const { lat, lng, radius } = filters.location;
      const R = 6371; // Earth's radius in kilometers

      filteredCourts = filteredCourts.filter(court => {
        const dLat = (court.location.lat - lat) * Math.PI / 180;
        const dLon = (court.location.lng - lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat * Math.PI / 180) * Math.cos(court.location.lat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        return distance <= radius;
      });
    }

    // Simulate some delay to show loading state
    setTimeout(() => {
      res.status(200).json(filteredCourts);
    }, 500);
  } catch (error) {
    console.error('Error processing court data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
