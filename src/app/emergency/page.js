'use client';
import { useState, useEffect } from 'react';
import LiveMap from '@/components/LiveMap';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';

export default function EmergencySOS() {
  const { location: userLocation } = useRealtimeLocation();
  const [seconds, setSeconds] = useState(0);
  const [activeSOS, setActiveSOS] = useState(true);
  const [flashlight, setFlashlight] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [fakeCall, setFakeCall] = useState(false);

  useEffect(() => {
    let timer;
    if (activeSOS) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeSOS]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainderSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSec.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Emergency Mode Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(220,38,38,0.15))',
          border: '1px solid rgba(239,68,68,0.5)', borderRadius: 20, padding: '20px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
          boxShadow: '0 0 32px rgba(239,68,68,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="pulse-dot pulse-dot-red" style={{ width: 14, height: 14 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: '#ef4444', textTransform: 'uppercase' }}>
                Emergency Mode Active
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 2 }}>
                Live GPS Broadcasting • Duration: {formatTimer(seconds)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="badge badge-error">
              <span className="icon">cell_tower</span> Live Transmitting
            </span>
            <button
              onClick={() => setActiveSOS(!activeSOS)}
              style={{ background: activeSOS ? 'rgba(255,255,255,0.1)' : '#ef4444', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}>
              {activeSOS ? 'Pause Broadcasting' : 'Resume SOS'}
            </button>
          </div>
        </div>

        {/* Main Grid: Left Live GPS Map with SOS Activation Button, Right Contacts & Quick Tools */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          
          {/* Left: Real-time Live GPS Map Canvas with Concentric Ring SOS Overlay */}
          <div style={{ position: 'relative', width: '100%', height: 480, borderRadius: 24, overflow: 'hidden', border: '2px solid rgba(239,68,68,0.5)' }}>
            <LiveMap
              userLocation={userLocation}
              zoom={16}
              height="100%"
            />

            {/* Central Giant SOS Pulsing Button */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, textAlign: 'center' }}>
              
              {/* Concentric Pulse Rings */}
              {activeSOS && (
                <>
                  <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '2px solid #ef4444', animation: 'sosRing 2s infinite' }} />
                  <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', border: '2px solid #ef4444', animation: 'sosRing 2s infinite 0.5s' }} />
                  <div style={{ position: 'absolute', inset: -60, borderRadius: '50%', border: '2px solid #ef4444', animation: 'sosRing 2s infinite 1s' }} />
                </>
              )}

              <button
                onClick={() => alert('Emergency Alert Broadcast Sent to Contacts & Dispatch!')}
                aria-label="Activate Emergency SOS Alert"
                style={{
                  width: 160, height: 160, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  border: '4px solid #fff', color: '#fff',
                  boxShadow: '0 0 50px rgba(239,68,68,0.8)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s ease', margin: '0 auto'
                }}>
                <span className="icon" style={{ fontSize: 44 }}>emergency</span>
                <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>SOS</span>
              </button>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginTop: 12, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {userLocation ? `Lat ${userLocation.lat.toFixed(4)}, Lng ${userLocation.lng.toFixed(4)}` : 'Tracking Live Coordinates...'}
              </div>
            </div>

          </div>

          {/* Right: Quick Emergency Tools & Contact Alert List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* Quick Actions Grid */}
            <div className="glass" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Emergency Tools</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button
                  onClick={() => setFakeCall(!fakeCall)}
                  style={{ background: fakeCall ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(34,211,238,0.3)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#22d3ee' }}>phone_in_talk</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{fakeCall ? 'Active Fake Call' : 'Trigger Fake Call'}</span>
                </button>

                <button
                  onClick={() => setAlarm(!alarm)}
                  style={{ background: alarm ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(239,68,68,0.3)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#ef4444' }}>volume_up</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{alarm ? 'Siren Active!' : 'Loud Siren Alarm'}</span>
                </button>

                <button
                  onClick={() => setFlashlight(!flashlight)}
                  style={{ background: flashlight ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.3)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#f59e0b' }}>highlight</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{flashlight ? 'Strobe Light ON' : 'Strobe Light'}</span>
                </button>

                <button
                  onClick={() => alert('Audio & Video Evidence Recording Started')}
                  style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#a855f7' }}>videocam</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Record Evidence</span>
                </button>
              </div>
            </div>

            {/* Emergency Contacts List */}
            <div className="glass" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Live Notified Guardians</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Mom (Primary Contact)</div>
                    <div style={{ fontSize: 11, color: '#10b981', marginTop: 2 }}>● Tracking your live coordinates</div>
                  </div>
                  <a href="tel:911" style={{ background: '#10b981', color: '#fff', padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="icon">call</span> Call
                  </a>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>David (Brother)</div>
                    <div style={{ fontSize: 11, color: '#10b981', marginTop: 2 }}>● SMS Alert Sent</div>
                  </div>
                  <a href="tel:911" style={{ background: '#6366f1', color: '#fff', padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="icon">call</span> Call
                  </a>
                </div>

                <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', padding: '12px 16px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>Emergency 911 Dispatch</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Direct Line to Local Emergency Services</div>
                  </div>
                  <a href="tel:911" style={{ background: '#ef4444', color: '#fff', padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="icon">emergency</span> 911
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
  );
}
