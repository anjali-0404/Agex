'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSos, setAutoSos] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppShell>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900 }} className="grad-text">App Settings</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
              Customize your AegisAI safety navigator preferences
            </p>
          </div>
          <button onClick={handleSave} className="btn-primary">
            <span className="icon" style={{ fontSize: 18 }}>save</span>
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {saved && (
          <div className="glass animate-in" style={{ padding: '14px 20px', marginBottom: 24, borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="icon">check_circle</span>
            Settings saved successfully!
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Safety & Emergency */}
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#ef4444' }}>
                <span className="icon">shield</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Safety & Emergency Controls</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Automatic SOS Trigger</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Automatically notify contacts if unusual fall or collision is detected</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoSos}
                  onChange={(e) => setAutoSos(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Sound & Siren Alerts</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Play loud alarm tones when triggering emergency SOS</div>
                </div>
                <input
                  type="checkbox"
                  checked={soundAlerts}
                  onChange={(e) => setSoundAlerts(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Privacy & Location */}
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#22d3ee' }}>
                <span className="icon">location_on</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Privacy & Location Services</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Real-time Location Sharing</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Share encrypted live coordinates with trusted contacts during active routes</div>
                </div>
                <input
                  type="checkbox"
                  checked={locationSharing}
                  onChange={(e) => setLocationSharing(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Push Notifications</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Receive instantaneous community safety alerts for nearby hazards</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Appearance & Theme */}
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#a855f7' }}>
                <span className="icon">palette</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Appearance & Aesthetics</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Empathetic Futurism Dark Mode</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ultra-sleek dark theme with glassmorphic cards and dynamic mesh gradient background</div>
              </div>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                style={{ width: 20, height: 20, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
