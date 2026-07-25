'use client';
import { useState, useEffect } from 'react';
import { DEFAULT_LOCATION } from '@/lib/constants';

export default function useRealtimeLocation() {
  const [location, setLocation] = useState(null); // { lat, lng, accuracy, timestamp }
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      // Fallback default
      setLocation(DEFAULT_LOCATION);
      return;
    }

    // Get immediate position first
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          speed: pos.coords.speed,
          heading: pos.coords.heading,
          timestamp: pos.timestamp
        });
        setLoading(false);
      },
      (err) => {
        console.warn('Geolocation initial error:', err.message);
        setError(err.message);
        setLoading(false);
        // Fallback default
        setLocation(DEFAULT_LOCATION);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    // Watch position in real-time continuous GPS tracking
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          speed: pos.coords.speed,
          heading: pos.coords.heading,
          timestamp: pos.timestamp
        });
        setError(null);
      },
      (err) => {
        console.warn('Geolocation watch error:', err.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, loading };
}
