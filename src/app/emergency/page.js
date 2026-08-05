'use client';
import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import LiveMap from '@/components/LiveMap';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';
import { useAuth } from '@/context/AuthContext';
import { soundEngine } from '@/utils/siren';

export default function EmergencySOS() {
  const { location: userLocation } = useRealtimeLocation();
  const { contacts, addContact, deleteContact, triggerSOS, cancelSOS, sosActive, sharingLocation, startSharingLocation, stopSharingLocation } = useAuth();
  
  const [seconds, setSeconds] = useState(0);
  const [flashlight, setFlashlight] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [fakeCall, setFakeCall] = useState(false);

  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    let timer;
    if (sosActive) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [sosActive]);

  // Siren Audio Control
  const toggleAlarm = () => {
    if (!alarm) {
      soundEngine.startSiren();
      setAlarm(true);
    } else {
      soundEngine.stopSiren();
      setAlarm(false);
    }
  };

  // Fake Call Audio Trigger
  const triggerFakeCall = () => {
    setFakeCall(true);
    soundEngine.playRingTone();
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainderSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSec.toString().padStart(2, '0')}`;
  };

  const handleAddContactSubmit = (e) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    addContact({ name: newContactName, phone: newContactPhone, relation: 'Family/Friend' });
    setNewContactName('');
    setNewContactPhone('');
    setShowAddForm(false);
  };

  return (
    <AppShell>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Emergency Mode Banner */}
        <div style={{
          background: sosActive ? 'linear-gradient(135deg, rgba(239,68,68,0.35), rgba(220,38,38,0.2))' : 'rgba(255,255,255,0.04)',
          border: sosActive ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: 22,
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          boxShadow: sosActive ? '0 0 36px rgba(239,68,68,0.4)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className={`pulse-dot ${sosActive ? 'pulse-dot-red' : 'pulse-dot-green'}`} style={{ width: 14, height: 14 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: sosActive ? '#ef4444' : '#10b981', textTransform: 'uppercase' }}>
                {sosActive ? '🚨 SOS EMERGENCY DISPATCH ACTIVE' : 'Aegis India Emergency Control Center'}
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 2 }}>
                {sosActive ? `E2EE Live Broadcast • Duration: ${formatTimer(seconds)}` : 'Ready to Protection • Tap SOS to Trigger Alert'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span className="badge badge-e2ee">
              <span className="icon" style={{ fontSize: 14 }}>lock</span> E2EE Encrypted
            </span>
            <button
              onClick={() => sosActive ? cancelSOS() : triggerSOS(userLocation)}
              className="btn-sos" style={{ background: sosActive ? '#334155' : undefined }}>
              <span className="icon">emergency</span>
              {sosActive ? 'Deactivate SOS' : 'Trigger Rapid SOS'}
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          
          {/* Left: Real-time India Map Canvas with Giant Pulsing SOS Button */}
          <div style={{ position: 'relative', width: '100%', height: 500, borderRadius: 24, overflow: 'hidden', border: sosActive ? '2px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,255,255,0.1)' }}>
            <LiveMap
              userLocation={userLocation}
              zoom={15}
              height="100%"
            />

            {/* Central Giant SOS Pulsing Button */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, textAlign: 'center' }}>
              <button
                onClick={() => triggerSOS(userLocation)}
                style={{
                  width: 160, height: 160, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  border: '4px solid #fff', color: '#fff',
                  boxShadow: '0 0 50px rgba(239,68,68,0.8)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s ease', margin: '0 auto',
                  animation: 'sosGlowPulse 1.5s infinite'
                }}>
                <span className="icon" style={{ fontSize: 44 }}>emergency</span>
                <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>RAPID SOS</span>
              </button>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 14, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                {userLocation ? `India GPS: ${userLocation.lat.toFixed(4)}° N, ${userLocation.lng.toFixed(4)}° E` : 'Connecting India Satellites...'}
              </div>
            </div>

            {/* Share Location Quick Button Overlay */}
            <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 1000 }}>
              <button
                onClick={() => sharingLocation ? stopSharingLocation() : startSharingLocation(userLocation)}
                className="btn-cyan" style={{ fontSize: 12, padding: '8px 16px' }}>
                <span className="icon">{sharingLocation ? 'location_off' : 'share_location'}</span>
                {sharingLocation ? 'Stop Location Share' : 'Share Live GPS'}
              </button>
            </div>
          </div>

          {/* Right: Emergency Tools & Saved Indian Emergency Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* Quick Emergency Tools */}
            <div className="glass" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Rapid Response Tools</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button
                  onClick={triggerFakeCall}
                  style={{ background: fakeCall ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(34,211,238,0.3)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#22d3ee' }}>phone_in_talk</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Trigger Fake Call</span>
                </button>

                <button
                  onClick={toggleAlarm}
                  style={{ background: alarm ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(239,68,68,0.3)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#ef4444' }}>volume_up</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{alarm ? 'Siren Active!' : 'Loud Siren Alarm'}</span>
                </button>

                <button
                  onClick={() => setFlashlight(!flashlight)}
                  style={{ background: flashlight ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.3)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#f59e0b' }}>highlight</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{flashlight ? 'Strobe ON' : 'Strobe Light'}</span>
                </button>

                <a
                  href="tel:112"
                  style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', padding: 16, borderRadius: 16, color: '#fff', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', textDecoration: 'none' }}>
                  <span className="icon" style={{ fontSize: 24, color: '#6366f1' }}>call</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Dial National 112</span>
                </a>
              </div>
            </div>

            {/* Saved Emergency Contacts List */}
            <div className="glass" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>Saved Emergency Contacts</h3>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Instant SOS SMS & Live Location target (+91)</div>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid #22d3ee', color: '#22d3ee', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  {showAddForm ? 'Cancel' : '+ Add Contact'}
                </button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, background: 'rgba(0,0,0,0.3)', padding: 14, borderRadius: 14 }}>
                  <input
                    type="text"
                    placeholder="Contact Name (e.g. Papa, Aarav)"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Indian Mobile (+91 98765 43210)"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-cyan" style={{ justifyContent: 'center', padding: 10 }}>Save Emergency Contact</button>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 240, overflowY: 'auto' }}>
                {contacts.map(contact => (
                  <div key={contact.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '12px 14px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#f8fafc' }}>{contact.name}</div>
                      <div style={{ fontSize: 12, color: '#22d3ee', marginTop: 2, fontWeight: 600 }}>📞 {contact.phone}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <a href={`tel:${contact.phone}`} className="badge badge-safe" style={{ textDecoration: 'none' }}>Call</a>
                      {contact.id.startsWith('c_') && (
                        <button onClick={() => deleteContact(contact.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                          <span className="icon" style={{ fontSize: 18 }}>delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Incoming Fake Call Screen Modal */}
        {fakeCall && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '60px 24px' }}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <div style={{ fontSize: 14, color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2 }}>Incoming Aegis Call</div>
              <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginTop: 12 }}>Papa (Rajesh Sharma)</h1>
              <div style={{ fontSize: 16, color: '#94a3b8', marginTop: 6 }}>+91 98765 43210 • New Delhi</div>
            </div>

            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #38bdf8)', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 60px rgba(56,189,248,0.6)', animation: 'sosGlowPulse 1.5s infinite' }}>
              <span className="icon" style={{ fontSize: 64 }}>person</span>
            </div>

            <div style={{ display: 'flex', gap: 40, width: '100%', maxWidth: 360 }}>
              <button
                onClick={() => setFakeCall(false)}
                style={{ flex: 1, padding: 18, borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(239,68,68,0.4)' }}>
                <span className="icon" style={{ fontSize: 32 }}>call_end</span>
              </button>
              <button
                onClick={() => setFakeCall(false)}
                style={{ flex: 1, padding: 18, borderRadius: '50%', background: '#10b981', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(16,185,129,0.4)' }}>
                <span className="icon" style={{ fontSize: 32 }}>call</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}

