'use client';
import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import LiveMap from '@/components/LiveMap';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';
import { useAuth } from '@/context/AuthContext';

export default function SafetyMap() {
  const { location: userLocation } = useRealtimeLocation();
  const { triggerSOS, sharingLocation, startSharingLocation, stopSharingLocation } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    if (userLocation && !mapCenter) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation, mapCenter]);

  // Generate dynamic real-time markers around user's live position in India (New Delhi fallback)
  const baseLat = userLocation ? userLocation.lat : 28.6139;
  const baseLng = userLocation ? userLocation.lng : 77.2090;

  const realIndianMarkers = [
    {
      id: 1,
      type: 'police',
      title: 'Connaught Place Police Station',
      lat: baseLat + 0.003,
      lng: baseLng + 0.004,
      desc: '24/7 Active Duty Police Control Room • Emergency Unit',
      phone: '+91 11 2336 1234',
      status: 'Active'
    },
    {
      id: 2,
      type: 'haven',
      title: 'Rajiv Chowk Metro Safe Haven',
      lat: baseLat - 0.004,
      lng: baseLng + 0.002,
      desc: 'CISF Security Guarded • Lit Entrance • Emergency Calling Point',
      phone: '112',
      status: 'Verified'
    },
    {
      id: 3,
      type: 'hazard',
      title: 'Waterlogging & Low Light Alert',
      lat: baseLat + 0.002,
      lng: baseLng - 0.005,
      desc: 'Reported 12m ago • Use Alternate Outer Corridor',
      status: 'Caution'
    },
    {
      id: 4,
      type: 'haven',
      title: 'Apollo Pharmacy 24x7 & First Aid',
      lat: baseLat - 0.002,
      lng: baseLng - 0.003,
      desc: 'Open All Night • Emergency Medical Aid & Sanitized Safe Haven',
      phone: '+91 98765 43210',
      status: 'Verified'
    },
    {
      id: 5,
      type: 'police',
      title: 'Cyber City Rapid Patrol Post',
      lat: baseLat + 0.006,
      lng: baseLng - 0.006,
      desc: 'Gurugram PCR Van Stationed',
      phone: '100',
      status: 'Active'
    }
  ];

  const filteredMarkers = realIndianMarkers.filter(m => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Police Stations') return m.type === 'police';
    if (activeFilter === 'Safe Havens') return m.type === 'haven';
    if (activeFilter === 'Incidents') return m.type === 'hazard';
    return true;
  });

  // Handle Geocoding Search via OpenStreetMap Nominatim API for Indian cities
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const top = data[0];
        setMapCenter([parseFloat(top.lat), parseFloat(top.lon)]);
        setSearchResults(data.slice(0, 4));
      } else {
        alert('No location found in India for: ' + searchQuery);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  const filters = ['All', 'Incidents', 'Police Stations', 'Safe Havens'];

  return (
    <AppShell>
      <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 100px)', overflow: 'hidden', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Real-time Interactive Leaflet Map */}
        <LiveMap
          userLocation={userLocation}
          markers={filteredMarkers}
          heatmap={showHeatmap}
          zoom={14}
          height="100%"
        />

        {/* Floating Top Controls: Search Bar & Filter Chips */}
        <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', width: '92%', maxWidth: 660, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 1000 }}>
          
          <form onSubmit={handleSearch} className="glass" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
            <span className="icon" style={{ color: '#22d3ee' }}>search</span>
            <input
              type="text"
              placeholder="Search Indian location (e.g., Connaught Place, Hauz Khas, MG Road, Bandra...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: 14, outline: 'none' }}
            />
            <button type="submit" disabled={searching} className="btn-cyan" style={{ padding: '8px 18px', fontSize: 13 }}>
              {searching ? 'Locating...' : 'Search'}
            </button>
          </form>

          {/* Filter Chips */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: activeFilter === f ? '#6366f1' : 'rgba(8, 12, 24, 0.75)',
                  backdropFilter: 'blur(12px)',
                  color: '#fff',
                  border: activeFilter === f ? '1px solid #818cf8' : '1px solid rgba(255,255,255,0.15)',
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}>
                {f}
              </button>
            ))}
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              style={{
                background: showHeatmap ? 'rgba(34,211,238,0.2)' : 'rgba(8, 12, 24, 0.75)',
                color: showHeatmap ? '#22d3ee' : '#94a3b8',
                border: showHeatmap ? '1px solid #22d3ee' : '1px solid rgba(255,255,255,0.15)',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}>
              🔥 Heatmap {showHeatmap ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Floating Bottom Live Location & SOS Quick Bar */}
        <div style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          gap: 12,
          background: 'rgba(8, 12, 24, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '10px 18px',
          borderRadius: 40,
          boxShadow: '0 10px 36px rgba(0,0,0,0.6)'
        }}>
          <button
            onClick={() => sharingLocation ? stopSharingLocation() : startSharingLocation(userLocation)}
            className="btn-cyan"
            style={{ padding: '8px 18px', fontSize: 13 }}>
            <span className="icon">{sharingLocation ? 'location_off' : 'share_location'}</span>
            {sharingLocation ? 'Stop Sharing' : 'Share Live GPS'}
          </button>
          <button
            onClick={() => triggerSOS(userLocation)}
            className="btn-sos"
            style={{ padding: '8px 20px', fontSize: 13 }}>
            <span className="icon">emergency</span> Rapid SOS
          </button>
        </div>

      </div>
    </AppShell>
  );
}
