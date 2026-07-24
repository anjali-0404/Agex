'use client';
import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import LiveMap from '@/components/LiveMap';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';

export default function SecureJourney() {
  const { location: userLocation } = useRealtimeLocation();
  const [journeyActive, setJourneyActive] = useState(true);
  const [progress, setProgress] = useState(45);
  const [checkedIn, setCheckedIn] = useState(false);
  const [destName, setDestName] = useState('Home (Oak Street)');

  useEffect(() => {
    let interval;
    if (journeyActive && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => (p < 99 ? p + 1 : 99));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [journeyActive, progress]);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setTimeout(() => setCheckedIn(false), 4000);
  };

  return (
    <AppShell>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900 }} className="grad-text">Secure Your Journey</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
              Real-time GPS tracking with automatic guardian check-ins
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleCheckIn}
              className="btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <span className="icon">check_circle</span> {checkedIn ? 'Check-in Recorded!' : 'Check In Safe'}
            </button>
            <button
              onClick={() => setJourneyActive(!journeyActive)}
              style={{ background: journeyActive ? 'rgba(239,68,68,0.2)' : 'linear-gradient(135deg, #6366f1, #4f46e5)', border: journeyActive ? '1px solid rgba(239,68,68,0.4)' : 'none', color: '#fff', padding: '12px 24px', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}>
              {journeyActive ? 'End Journey' : 'Start Journey'}
            </button>
          </div>
        </div>

        {/* Active Journey Tracker Status Card */}
        <div className="glass animate-in" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
                <span className="icon" style={{ fontSize: 24 }}>directions_walk</span>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Destination</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9' }}>{destName}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ESTIMATED ETA</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#6366f1' }}>14 mins left</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>LIVE STATUS</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="pulse-dot pulse-dot-green" /> On Track
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, color: 'var(--text-secondary)' }}>
              <span>Departure: State St</span>
              <span>Progress: {progress}%</span>
              <span>Arrival: {destName}</span>
            </div>
            <div style={{ width: '100%', height: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{
                width: `${progress}%`, height: '100%',
                background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
                boxShadow: '0 0 16px rgba(34,211,238,0.6)',
                transition: 'width 1s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Live GPS Map & Guardians Panel Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          
          {/* Real-time Live GPS Map Preview */}
          <div style={{ position: 'relative', width: '100%', height: 420, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <LiveMap
              userLocation={userLocation}
              zoom={15}
              height="100%"
            />

            <div className="glass" style={{ position: 'absolute', bottom: 16, left: 16, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 1000, fontSize: 13 }}>
              <span className="pulse-dot pulse-dot-cyan" />
              <span>Real-time GPS Location Active</span>
            </div>
          </div>

          {/* Notified Guardians & Check-in Schedule */}
          <div className="glass animate-in delay-2" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Tracking Guardians</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: 16, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyK9Eqghk56sthuiLJOq_ZTO5qY9vUagPEaXyNBpHg_J4HjXR-CDbPj-4NWXhbJCWO2AnXqwqfbvdK_4zKEugfOSVF_IHDQTBb4UgUp2hNVDjc0yFkxZ_FRoR8nQ3l6xqrkvtg9BMoOLg-v4SKOLJ65V0l52RUBxSDiNXM3dklXsEc6HpdkgmKkyaFU3aDo2ODH0gV3B4AGe0pwmbzy3Lr9TCrLwwfJqXeuwR0FU-5uFTZA8TZxweS3rnah_2hF5TH83DHYTB8cGkG" alt="Mom" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Mom (Primary Guardian)</div>
                  <div style={{ fontSize: 12, color: '#10b981', marginTop: 2 }}>● Active live location feed</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: 16, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKyBcnQJQz0RjLPZX3KxpHcrGdidATpg0i7e2K4h9UaxngfwxzDyoreMA8z1_jpe4XAqzh9xzyxnDPakz1Lk2Mh0A39CKc9FLt9V7lkj4lpTH9tV_nGIlmsSq5AltrXlwN7fjde8qd-l9R1u81mZg3quHU1lfmKXY5bTJAVPCs8pL5xyUSeymKLnAg6yP0RWxFZD8eKETzEmG5WhNpTXFM6Vw8BiCGpb-wENLrB7uHw4Wd-4NxZrJdEWK1jsdVUdlVpOvF6ue7hrux" alt="David" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>David (Brother)</div>
                  <div style={{ fontSize: 12, color: '#10b981', marginTop: 2 }}>● Active live location feed</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>AUTOMATIC SAFETY CHECK</div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', background: 'rgba(99,102,241,0.1)', padding: 12, borderRadius: 10, border: '1px solid rgba(99,102,241,0.2)' }}>
                ⏰ Next automated safety check in <strong>5 minutes</strong>. If unacknowledged, alert SMS is dispatched.
              </div>
            </div>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
