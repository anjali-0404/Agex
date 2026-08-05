'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [e2eeEnabled, setE2eeEnabled] = useState(true);
  const [autoSos, setAutoSos] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [pollInterval, setPollInterval] = useState('8s');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppShell>
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900 }} className="grad-text">Settings & Privacy</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
              Configure E2EE encryption, real-time backend sync & Indian emergency preferences
            </p>
          </div>
          <button onClick={handleSave} className="btn-primary">
            <span className="icon" style={{ fontSize: 18 }}>save</span>
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        {saved && (
          <div className="glass animate-in" style={{ padding: '14px 20px', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 16 }}>
            <span className="icon">check_circle</span>
            Settings & E2EE preferences saved successfully!
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* E2EE Security Settings */}
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                <span className="icon">lock</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>End-to-End Encryption (E2EE)</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Client-Side AES-GCM 256-Bit Encryption</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Encrypt live location payloads & emergency contacts before backend transmission</div>
                </div>
                <input
                  type="checkbox"
                  checked={e2eeEnabled}
                  onChange={(e) => setE2eeEnabled(e.target.checked)}
                  style={{ width: 20, height: 20, cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Safety & Emergency */}
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <span className="icon">shield</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Safety & Emergency Controls</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Automatic SOS Trigger on Fall</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Notify saved contacts (+91) & 112 if a collision/fall is detected</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoSos}
                  onChange={(e) => setAutoSos(e.target.checked)}
                  style={{ width: 20, height: 20, cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Sound Siren Alert</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Play loud emergency audio siren when rapid SOS is triggered</div>
                </div>
                <input
                  type="checkbox"
                  checked={soundAlerts}
                  onChange={(e) => setSoundAlerts(e.target.checked)}
                  style={{ width: 20, height: 20, cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Real-time Data Sync Frequency */}
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
                <span className="icon">sync</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Real-time Backend Data Stream</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Backend Telemetry Refresh Rate</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Frequency of syncing live safety scores and Indian incident alerts</div>
              </div>
              <select
                value={pollInterval}
                onChange={(e) => setPollInterval(e.target.value)}
                style={{ padding: '6px 14px', borderRadius: 12 }}>
                <option value="5s">Every 5 Seconds (High Precision)</option>
                <option value="8s">Every 8 Seconds (Recommended)</option>
                <option value="15s">Every 15 Seconds (Battery Saver)</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
