export interface Court {
  id: string;
  name: string;
  type: CourtType;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  amenities: Amenity[];
  availability: Availability;
  rating: number;
  pricePerHour: number;
  images: string[];
  contact: {
    phone: string;
    hours: {
      open: string;
      close: string;
    };
    bookingMethods: ('phone' | 'in-person' | 'walk-in')[];
    instructions?: string;
  };
  social?: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
}

export type CourtType = 'basketball' | 'tennis' | 'volleyball' | 'football' | 'multipurpose';

export type Amenity = 
  | 'lighting'
  | 'parking'
  | 'seating'
  | 'water_fountain'
  | 'restroom'
  | 'locker_room'
  | 'equipment_rental'
  | 'shower'
  | 'wifi';

export type Availability = 'available' | 'busy' | 'full' | 'closed';

export interface SearchFilters {
  courtType?: CourtType[];
  amenities?: Amenity[];
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: Availability[];
  rating?: number;
  location?: {
    lat: number;
    lng: number;
    radius: number; // in kilometers
  };
}
