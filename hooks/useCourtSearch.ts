import { useState, useEffect } from 'react';
import { Court, SearchFilters } from '../types/courts';

export const useCourtSearch = (initialFilters?: SearchFilters) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {});
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/courts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filters }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courts');
        }

        const data = await response.json();
        setCourts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, [filters]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    courts,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
  };
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
