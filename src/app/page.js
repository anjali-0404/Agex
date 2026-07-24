'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import Link from 'next/link';

export default function Dashboard() {
  const [navigating, setNavigating] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', title: 'Streetlight Outage', time: '10 min ago', area: 'Oak & 5th Ave', active: true, color: '#f59e0b' },
    { id: 2, type: 'alert', title: 'Sidewalk Blocked', time: '32 min ago', area: 'Pine St (Construction)', active: true, color: '#a855f7' },
    { id: 3, type: 'info', title: 'Event Crowd', time: '1 hr ago', area: 'Central Park North', active: true, color: '#22d3ee' },
  ]);

  const dismissAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: false } : a));
  };

  const trendData = [
    { day: 'Mon', score: 60, height: '60%' },
    { day: 'Tue', score: 75, height: '75%' },
    { day: 'Wed', score: 85, height: '85%' },
    { day: 'Thu', score: 90, height: '90%' },
    { day: 'Fri', score: 70, height: '70%' },
    { day: 'Today', score: 88, height: '88%', active: true },
  ];

  return (
    <AppShell>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Welcome Header */}
        <div className="glass animate-in" style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCDzWbsWn99APYomqRDkbS5k7UncVZ_w03EAuZRonCUwvscGvzAhT0gIUajYiNYib4IYOGGdstdGezp0E1_BC1J3vB9UagdRkFbw1BJxIIv8XV1LvUV0o9THrKzkjPS57dRT5hish5X_QgWA74J_OaSSQuBdH8w-TPKdsemLiU576c9A7yae9DFG56iiEfVljHu8c6svDS86psLGXi307-_x9_fRjq8UbtcDk4IzQEEQ2NEceF5DuYzAGO4-nGOyoGRmiI3BkPgo"
              alt="Sarah" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #6366f1', objectFit: 'cover' }} />
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 900 }} className="grad-text">Welcome back, Sarah</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span className="pulse-dot pulse-dot-cyan" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Aegis AI Monitoring • Chicago Downtown</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="badge badge-safe">
              <span className="pulse-dot pulse-dot-green" />
              Area Status: Safe
            </span>
            <Link href="/emergency" className="btn-sos">
              <span className="icon">emergency</span> SOS
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          
          {/* Safety Index Card */}
          <div className="glass animate-in delay-1" style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>
              Personal Safety Index
            </div>
            
            <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 16px' }} onClick={() => setShowDetail(!showDetail)}>
              <svg width="140" height="140" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', cursor: 'pointer' }}>
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="transparent" />
                <circle
                  cx="60" cy="60" r="50"
                  stroke="url(#indigoGrad)" strokeWidth="10" fill="transparent"
                  strokeDasharray="314"
                  strokeDashoffset={314 * (1 - 88 / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                />
                <defs>
                  <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#f1f5f9' }}>88</span>
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>/ 100</span>
              </div>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>Optimal Protection</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
              High lighting density, low incident density within 1.2 mile radius.
            </p>

            <button
              onClick={() => setShowDetail(!showDetail)}
              style={{ marginTop: 16, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#6366f1', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
              {showDetail ? 'Hide Breakdown ▲' : 'View Factors ▼'}
            </button>

            {showDetail && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', width: '100%', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Street Lighting</span><span style={{ color: '#10b981', fontWeight: 600 }}>94/100</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Police Presence</span><span style={{ color: '#6366f1', fontWeight: 600 }}>85/100</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Community Trust</span><span style={{ color: '#22d3ee', fontWeight: 600 }}>90/100</span></div>
              </div>
            )}
          </div>

          {/* AI Route Suggestion */}
          <div className="glass animate-in delay-2" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #22d3ee' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="badge badge-cyan">
                  <span className="icon" style={{ fontSize: 14 }}>smart_toy</span> AI Recommendation
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Updated 2m ago</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>Evening Commute</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                Via Main St & 4th Ave • Well-lit corridor with active CCTV coverage
              </p>
              
              <div style={{ display: 'flex', gap: 16, margin: '20px 0' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12, flex: 1, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ESTIMATED TIME</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#6366f1', marginTop: 2 }}>24 mins</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12, flex: 1, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>RISK LEVEL</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981', marginTop: 2 }}>Very Low</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setNavigating(!navigating)}
                className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                <span className="icon">{navigating ? 'navigation' : 'play_arrow'}</span>
                {navigating ? 'Navigating...' : 'Start Route'}
              </button>
              <Link href="/routes" style={{ padding: '12px 16px', borderRadius: 50, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="icon">alt_route</span>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass animate-in delay-3" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Quick Actions
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Link href="/report" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: 16, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="icon" style={{ fontSize: 28, color: '#6366f1' }}>report</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Report Hazard</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Log streetlight, obstruction</span>
              </Link>

              <Link href="/map" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', padding: 16, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="icon" style={{ fontSize: 28, color: '#22d3ee' }}>map</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Safety Map</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>View live heatmaps</span>
              </Link>

              <Link href="/assistant" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', padding: 16, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="icon" style={{ fontSize: 28, color: '#a855f7' }}>smart_toy</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>AI Companion</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Chat with Aegis</span>
              </Link>

              <Link href="/journey" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: 16, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="icon" style={{ fontSize: 28, color: '#10b981' }}>directions_walk</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Guard Walk</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Tracked ETA journey</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Lower Row: Nearby Alerts & Safety Trend */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          
          {/* Nearby Alerts */}
          <div className="glass animate-in delay-3" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Nearby Safety Alerts</h3>
              <span className="badge badge-primary">{alerts.filter(a => a.active).length} Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {alerts.map((alert) => alert.active && (
                <div key={alert.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `4px solid ${alert.color}`, padding: '14px 16px', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{alert.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{alert.area} • {alert.time}</div>
                  </div>
                  <button onClick={() => dismissAlert(alert.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <span className="icon" style={{ fontSize: 18 }}>close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Area Safety Trend */}
          <div className="glass animate-in delay-4" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Area Safety Trend</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Weekly index progression</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#10b981' }}>+12% vs last week</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, paddingT: 20, gap: 12 }}>
              {trendData.map((item, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: item.active ? '#22d3ee' : 'var(--text-muted)' }}>{item.score}</span>
                  <div style={{
                    width: '100%',
                    height: item.height,
                    borderRadius: 8,
                    background: item.active
                      ? 'linear-gradient(180deg, #22d3ee, #6366f1)'
                      : 'linear-gradient(180deg, rgba(99,102,241,0.4), rgba(99,102,241,0.1))',
                    boxShadow: item.active ? '0 0 12px rgba(34,211,238,0.4)' : 'none',
                    transition: 'all 0.5s ease'
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: item.active ? '#f1f5f9' : 'var(--text-muted)' }}>{item.day}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
