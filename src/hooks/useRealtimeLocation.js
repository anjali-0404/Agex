'use client';
import { useState, useEffect } from 'react';

// Default Fallback Coordinates: India (New Delhi Connaught Place / Central India)
const INDIA_DEFAULT_CENTER = { lat: 28.6139, lng: 77.2090, accuracy: 100 };

export default function useRealtimeLocation() {
  const [location, setLocation] = useState(null); // { lat, lng, accuracy, timestamp }
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      // Fallback default (India Center)
      setLocation(INDIA_DEFAULT_CENTER);
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
        console.warn('Geolocation initial fallback to India:', err.message);
        setError(err.message);
        setLoading(false);
        // Fallback default (India Center)
        setLocation(INDIA_DEFAULT_CENTER);
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
        console.warn('Geolocation watch note:', err.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, loading };
}
