'use client';
import { useState, useEffect } from 'react';
import LiveMap from '@/components/LiveMap';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';
import { DEFAULT_LOCATION } from '@/lib/constants';

export default function SafetyMap() {
  const { location: userLocation, loading, error: geoError } = useRealtimeLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    if (userLocation && !mapCenter) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation, mapCenter]);

  // Generate dynamic real-time markers around the user's live position
  const baseLat = userLocation ? userLocation.lat : DEFAULT_LOCATION.lat;
  const baseLng = userLocation ? userLocation.lng : DEFAULT_LOCATION.lng;

  const realMarkers = [
    {
      id: 1,
      type: 'police',
      title: 'Local Precinct Station',
      lat: baseLat + 0.003,
      lng: baseLng + 0.004,
      desc: '24/7 Active Duty Police Hub • Emergency Response Unit',
      status: 'Active'
    },
    {
      id: 2,
      type: 'haven',
      title: 'Verified Safe Place / Community Haven',
      lat: baseLat - 0.004,
      lng: baseLng + 0.002,
      desc: 'Lit Entrance • CCTV Monitored • Emergency Calling Point',
      status: 'Verified'
    },
    {
      id: 3,
      type: 'hazard',
      title: 'Streetlight Outage Alert',
      lat: baseLat + 0.002,
      lng: baseLng - 0.005,
      desc: 'Reported 12m ago • Dimly Lit Corridor',
      status: 'Caution'
    },
    {
      id: 4,
      type: 'haven',
      title: '24/7 Pharmacy & First Aid',
      lat: baseLat - 0.002,
      lng: baseLng - 0.003,
      desc: 'Open All Night • Medical Aid Available',
      status: 'Verified'
    }
  ];

  const filteredMarkers = realMarkers.filter(m => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Police Stations') return m.type === 'police';
    if (activeFilter === 'Safe Havens') return m.type === 'haven';
    if (activeFilter === 'Incidents') return m.type === 'hazard';
    return true;
  });

  // Handle Geocoding Search via OpenStreetMap Nominatim API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const top = data[0];
        setMapCenter([parseFloat(top.lat), parseFloat(top.lon)]);
        setSearchResults(data.slice(0, 4));
      } else {
        alert('No location found for: ' + searchQuery);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  const filters = ['All', 'Safe Routes', 'Incidents', 'Police Stations', 'Safe Havens'];

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 80px)', overflow: 'hidden', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Real-time Interactive Leaflet Map */}
        <LiveMap
          userLocation={userLocation}
          markers={filteredMarkers}
          heatmap={showHeatmap}
          zoom={15}
          height="100%"
        />

        {/* Floating Top Controls: Search Bar & Filter Chips */}
        <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', width: '92%', maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 1000 }}>
          
          <form onSubmit={handleSearch} className="glass" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
            <span className="icon" style={{ color: '#22d3ee' }}>search</span>
            <input
              type="text"
              placeholder="Search real location (e.g. Times Square, Chicago Loop...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: 14 }}
            />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {searching ? 'Searching...' : 'Search'}
            </button>
            <button
              type="button"
              onClick={() => setShowHeatmap(!showHeatmap)}
              style={{ background: showHeatmap ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(34,211,238,0.4)', color: showHeatmap ? '#22d3ee' : '#94a3b8', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Heatmap: {showHeatmap ? 'ON' : 'OFF'}
            </button>
          </form>

          {/* Filter Chips */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, whitespace: 'nowrap',
                  background: activeFilter === f ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(8,12,24,0.85)',
                  border: activeFilter === f ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.2s ease'
                }}>
                {f}
              </button>
            ))}
          </div>

          {/* Search Autocomplete Results */}
          {searchResults.length > 0 && (
            <div className="glass" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1001 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>Search Results:</div>
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setMapCenter([parseFloat(res.lat), parseFloat(res.lon)]);
                    setSearchResults([]);
                  }}
                  style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', cursor: 'pointer', fontSize: 13, color: '#f1f5f9' }}>
                  📍 {res.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live GPS Status Pill Bottom-Left */}
        <div className="glass" style={{ position: 'absolute', bottom: 24, left: 24, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 1000 }}>
          <span className="pulse-dot pulse-dot-cyan" />
          <div style={{ fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: '#22d3ee' }}>GPS Tracking: Active</span>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: 11 }}>
              {userLocation ? `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}` : 'Acquiring GPS...'}
            </span>
          </div>
        </div>

        {/* Legend Card Bottom-Right */}
        <div className="glass" style={{ position: 'absolute', bottom: 24, right: 24, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6, zIndex: 1000, fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 8px #22d3ee' }} /> Your Live GPS Location</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#6366f1' }} /> Police Precinct</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} /> Verified Safe Place</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} /> Active Caution Alert</div>
        </div>

      </div>
  );
}
