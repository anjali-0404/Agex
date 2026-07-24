'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';

export default function SafetyMap() {
  const [search, setSearch] = useState('');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const filters = ['All', 'Safe Routes', 'Night Mode', 'Incidents', 'Police Stations', 'Safe Havens'];

  const markers = [
    { id: 1, type: 'police', title: '1st Precinct Station', lat: '40%', lng: '35%', desc: '24/7 Active Officers • Emergency Hub', status: 'Active' },
    { id: 2, type: 'haven', title: 'City Central Library', lat: '65%', lng: '60%', desc: 'Verified Safe Place • Open till 10 PM', status: 'Verified' },
    { id: 3, type: 'alert', title: 'Lighting Outage', lat: '30%', lng: '70%', desc: 'Reported 15 mins ago • Avoid Alleyway', status: 'Warning' },
  ];

  return (
    <AppShell>
      <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)', overflow: 'hidden', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Map Background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwVsANG2pa0DOLU64Q2iqGxN8DMkbV5IeoCn_xp-Aj2eWNGCR9MzfmaRi1DEpjQ8KDCPyWnuI7fR25If5wQel-p911EukWZX8wDGhOd7YFjPaavLkrfGjGyjMjh7_meGeGuyopc2a-17wCwwRuwSI3zeJuCIrc8TO4TpFoSh1iBRecdK3lFDnQDBETaNht9shj-qGuzY_6xSKEs24mjggZx1xHg8_KQ1xX9H0-OCxYjv6AQwDT2ICqkDOhpXESaKiO8VE6S8xAFos0')`,
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55) contrast(1.2)'
        }} />

        {/* Heatmap Layer */}
        {showHeatmap && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(circle at 35% 40%, rgba(16,185,129,0.35) 0%, transparent 40%),
                        radial-gradient(circle at 60% 65%, rgba(16,185,129,0.3) 0%, transparent 35%),
                        radial-gradient(circle at 70% 30%, rgba(239,68,68,0.4) 0%, transparent 25%)`
          }} />
        )}

        {/* Top Floating Controls: Search & Filters */}
        <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 10 }}>
          
          {/* Search Bar Pill */}
          <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
            <span className="icon" style={{ color: '#22d3ee' }}>search</span>
            <input
              type="text"
              placeholder="Search for safe locations, routes, or safe havens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: 14 }}
            />
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              style={{ background: showHeatmap ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(34,211,238,0.4)', color: showHeatmap ? '#22d3ee' : '#94a3b8', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
              Heatmap: {showHeatmap ? 'ON' : 'OFF'}
            </button>
          </div>

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
                  color: '#fff', backdropFilter: 'blur(10px)', transition: 'all 0.2s ease'
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Map Markers */}
        {markers.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedMarker(m)}
            style={{
              position: 'absolute', top: m.lat, left: m.lng,
              transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: 12
            }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: m.type === 'police' ? '#6366f1' : m.type === 'haven' ? '#10b981' : '#ef4444',
              display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#fff',
              boxShadow: `0 0 20px ${m.type === 'police' ? '#6366f1' : m.type === 'haven' ? '#10b981' : '#ef4444'}`,
              animation: 'pulseDot 2s infinite'
            }}>
              <span className="icon" style={{ fontSize: 20, margin: 'auto' }}>
                {m.type === 'police' ? 'local_police' : m.type === 'haven' ? 'verified' : 'warning'}
              </span>
            </div>
          </div>
        ))}

        {/* Marker Detail Popup */}
        {selectedMarker && (
          <div className="glass animate-in" style={{ position: 'absolute', bottom: 30, left: 30, width: 320, padding: 20, zIndex: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className={`badge ${selectedMarker.type === 'alert' ? 'badge-error' : 'badge-safe'}`}>{selectedMarker.status}</span>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>{selectedMarker.title}</h4>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{selectedMarker.desc}</p>
              </div>
              <button onClick={() => setSelectedMarker(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <span className="icon">close</span>
              </button>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}>
              Navigate Here
            </button>
          </div>
        )}

        {/* Legend Card Bottom-Right */}
        <div className="glass" style={{ position: 'absolute', bottom: 20, right: 20, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6, zIndex: 10, fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} /> Safe Zone (Low Risk)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} /> Moderate Caution</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} /> Incident / Alert Area</div>
        </div>

      </div>
    </AppShell>
  );
}
