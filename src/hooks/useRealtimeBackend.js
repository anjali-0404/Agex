'use client';
import { useState, useEffect } from 'react';

/**
 * Real-time Backend Data Hook
 * Syncs real-time safety scores, active emergency alerts, live telemetry,
 * and Indian community feeds from the Next.js API endpoints.
 */
export default function useRealtimeBackend(initialLocation) {
  const [realtimeData, setRealtimeData] = useState({
    safetyIndex: 88,
    activeAlerts: [
      { id: 1, type: 'warning', title: 'Streetlight Outage', area: 'Connaught Place, Block B', time: '5 mins ago', active: true, color: '#f59e0b' },
      { id: 2, type: 'alert', title: 'Waterlogging Reported', area: 'Hauz Khas Outer Ring Road', time: '18 mins ago', active: true, color: '#a855f7' },
      { id: 3, type: 'info', title: 'High Patrol Density', area: 'Cyber City, Gurugram', time: 'Just now', active: true, color: '#22d3ee' }
    ],
    safeHavensCount: 24,
    policeStationsCount: 12,
    liveCrowdDensity: 'Low Risk',
    cctvCoverage: '94%',
    city: 'Delhi NCR, India',
    lastSync: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRealtimeBackend() {
      try {
        const lat = initialLocation?.lat || 28.6139;
        const lng = initialLocation?.lng || 77.2090;

        const res = await fetch(`/api/realtime?lat=${lat}&lng=${lng}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setRealtimeData(prev => ({
              ...prev,
              ...data,
              lastSync: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }));
          }
        }
      } catch (err) {
        console.warn('Realtime API poll note:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRealtimeBackend();

    // Poll backend every 8 seconds for real-time live data updates
    const interval = setInterval(fetchRealtimeBackend, 8000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [initialLocation?.lat, initialLocation?.lng]);

  return { realtimeData, loading };
}
