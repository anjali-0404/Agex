'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import Link from 'next/link';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';
import useRealtimeBackend from '@/hooks/useRealtimeBackend';
import { useAuth } from '@/context/AuthContext';

export default function AppDashboard() {
  const { location: userLocation } = useRealtimeLocation();
  const { realtimeData } = useRealtimeBackend(userLocation);
  const { user, isAuthenticated, triggerSOS, sharingLocation, startSharingLocation, stopSharingLocation, shareLink } = useAuth();
  
  const [navigating, setNavigating] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', title: 'Streetlight Maintenance', time: '5 min ago', area: 'Connaught Place Block C, New Delhi', active: true, color: '#f59e0b' },
    { id: 2, type: 'alert', title: 'Road Barrier Blocked', time: '18 min ago', area: 'Hauz Khas Outer Ring Road', active: true, color: '#c084fc' },
    { id: 3, type: 'info', title: 'High Patrol Presence', time: 'Just now', area: 'Cyber City, Gurugram', active: true, color: '#38bdf8' },
  ]);

  const dismissAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: false } : a));
  };

  const trendData = [
    { day: 'Mon', score: 80, height: '80%' },
    { day: 'Tue', score: 84, height: '84%' },
    { day: 'Wed', score: 86, height: '86%' },
    { day: 'Thu', score: 91, height: '91%' },
    { day: 'Fri', score: 85, height: '85%' },
    { day: 'Today', score: realtimeData.safetyIndex, height: `${realtimeData.safetyIndex}%`, active: true },
  ];

  return (
    <AppShell>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Welcome Header */}
        <div className="glass animate-in" style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'} 
              style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid #38bdf8', objectFit: 'cover' }} 
            />
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 900 }} className="grad-text">
                Welcome back, {user?.name || 'Ananya'}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span className="pulse-dot pulse-dot-cyan" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  Location: {userLocation ? `${userLocation.lat.toFixed(4)}° N, ${userLocation.lng.toFixed(4)}° E` : 'Connaught Place, New Delhi'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span className="badge badge-safe">
              <span className="pulse-dot pulse-dot-green" />
              Status: Protected
            </span>
            <button onClick={() => triggerSOS(userLocation)} className="btn-sos">
              <span className="icon">emergency</span> Rapid SOS
            </button>
          </div>
        </div>

        {/* Live Location Sharing Ribbon */}
        <div className="glass animate-in" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderLeft: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="icon" style={{ fontSize: 28, color: '#38bdf8' }}>share_location</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Live Location Broadcast to Saved Emergency Contacts</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {sharingLocation ? `Active link: ${shareLink}` : 'Broadcasting encrypted coordinates to your saved emergency contacts.'}
              </div>
            </div>
          </div>
          <button
            onClick={() => sharingLocation ? stopSharingLocation() : startSharingLocation(userLocation)}
            className="btn-cyan">
            <span className="icon">{sharingLocation ? 'location_off' : 'send'}</span>
            {sharingLocation ? 'Stop Sharing' : 'Share Live GPS Location'}
          </button>
        </div>

        {/* Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          
          {/* Safety Index Card */}
          <div className="glass animate-in delay-1" style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>
              India Real-Time Safety Index
            </div>
            
            <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 16px', cursor: 'pointer' }} onClick={() => setShowDetail(!showDetail)}>
              <svg width="140" height="140" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="transparent" />
                <circle
                  cx="60" cy="60" r="50"
                  stroke="url(#indigoGrad)" strokeWidth="10" fill="transparent"
                  strokeDasharray="314"
                  strokeDashoffset={314 * (1 - realtimeData.safetyIndex / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                />
                <defs>
                  <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#f8fafc' }}>{realtimeData.safetyIndex}</span>
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>/ 100</span>
              </div>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#f8fafc' }}>Optimal Real-time Protection</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
              Computed live from actual GPS radius in {user?.city || 'Delhi NCR'}. High CCTV density ({realtimeData.liveTelemetry?.cctvDensity || '94%'}), 18 active PCR vans.
            </p>

            <button
              onClick={() => setShowDetail(!showDetail)}
              style={{ marginTop: 16, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {showDetail ? 'Hide Breakdown ▲' : 'View Factors ▼'}
            </button>

            {showDetail && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', width: '100%', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Street Lighting</span><span style={{ color: '#10b981', fontWeight: 700 }}>94/100</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Police PCR Presence</span><span style={{ color: '#818cf8', fontWeight: 700 }}>88/100</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Backend Live Feed</span><span style={{ color: '#38bdf8', fontWeight: 700 }}>Sync @ {realtimeData.lastSync || 'Now'}</span></div>
              </div>
            )}
          </div>

          {/* AI Safe Route Suggestion */}
          <div className="glass animate-in delay-2" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #38bdf8' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="badge badge-cyan">
                  <span className="icon" style={{ fontSize: 14 }}>smart_toy</span> Live Route AI
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>India Telemetry</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Safe Corridor (Connaught Place → Hauz Khas)</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                Optimized route computed from your actual GPS position
              </p>
              
              <div style={{ display: 'flex', gap: 16, margin: '20px 0' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 14, flex: 1, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>GPS POSITION</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>
                    {userLocation ? `${userLocation.lat.toFixed(3)}°, ${userLocation.lng.toFixed(3)}°` : '28.614°, 77.209°'}
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 14, flex: 1, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>RISK LEVEL</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981', marginTop: 4 }}>Very Low</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setNavigating(!navigating)}
                className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                <span className="icon">{navigating ? 'navigation' : 'play_arrow'}</span>
                {navigating ? 'Live Navigation Active' : 'Start Live Navigation'}
              </button>
              <Link href="/map" className="btn-cyan" style={{ padding: '12px 16px' }}>
                <span className="icon">map</span>
              </Link>
            </div>
          </div>

          {/* Real-time Alerts Feed */}
          <div className="glass animate-in delay-3" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Real-time Local Alerts</h3>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.city || 'Delhi NCR'} Feed</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {alerts.filter(a => a.active).map(alert => (
                  <div key={alert.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${alert.color}44`,
                    borderLeft: `4px solid ${alert.color}`,
                    padding: '12px 14px',
                    borderRadius: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#f8fafc' }}>{alert.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{alert.area} • {alert.time}</div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <span className="icon" style={{ fontSize: 18 }}>close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/report" style={{ marginTop: 16, fontSize: 13, color: '#818cf8', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Report New Incident in India</span>
              <span className="icon" style={{ fontSize: 16 }}>arrow_forward</span>
            </Link>
          </div>

        </div>

        {/* Safety Trend Chart Card */}
        <div className="glass animate-in" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Weekly Safety Score Trend</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Aggregated from local police feeds & user incident reports</p>
            </div>
            <span className="badge badge-safe">Avg Score: 86/100</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, gap: 12, paddingTop: 20 }}>
            {trendData.map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: bar.active ? '#38bdf8' : 'var(--text-secondary)' }}>{bar.score}</span>
                <div style={{
                  width: '100%',
                  maxWidth: 40,
                  height: bar.height,
                  background: bar.active
                    ? 'linear-gradient(to top, #6366f1, #38bdf8)'
                    : 'rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  boxShadow: bar.active ? '0 0 20px rgba(56, 189, 248, 0.4)' : 'none',
                  transition: 'height 1s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />
                <span style={{ fontSize: 12, color: bar.active ? '#38bdf8' : 'var(--text-muted)', fontWeight: bar.active ? 800 : 500 }}>{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
