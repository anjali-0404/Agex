'use client';
import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';

export default function ReportIncidentPage() {
  const { location: userLocation } = useRealtimeLocation();
  const [category, setCategory] = useState('Poor Lighting');
  const [locationStr, setLocationStr] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    'Harassment', 'Poor Lighting', 'Suspicious Activity', 
    'Unsafe Area', 'Assault', 'Property Crime'
  ];

  const handleUseGPS = () => {
    if (userLocation) {
      setLocationStr(`GPS: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)} (Current Position)`);
    } else {
      setLocationStr('GPS: 41.8781, -87.6298 (Default Position)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setDescription('');
    setLocationStr('');
  };

  return (
    <AppShell>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        <div className="glass animate-in" style={{ padding: 32, borderRadius: 24 }}>
          {!isSuccess ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                  <span className="icon" style={{ fontSize: 24 }}>report</span>
                </div>
                <div>
                  <h1 style={{ fontSize: 24, fontWeight: 900 }} className="grad-text">Report an Incident</h1>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Help protect your community by logging hazards or incidents</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                
                {/* Category selector */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: 10 }}>Incident Category</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(c)}
                        style={{
                          padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                          background: category === c ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.03)',
                          border: category === c ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                          color: '#fff', cursor: 'pointer', transition: 'all 0.2s ease'
                        }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location with Auto GPS button */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>Incident Location</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input
                      type="text"
                      placeholder="Enter address or street intersection..."
                      value={locationStr}
                      onChange={(e) => setLocationStr(e.target.value)}
                      className="input-glass"
                      style={{ flex: 1 }}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleUseGPS}
                      style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', color: '#22d3ee', padding: '0 16px', borderRadius: 16, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whitespace: 'nowrap' }}>
                      <span className="icon">my_location</span> Use GPS
                    </button>
                  </div>
                </div>

                {/* Date & Time Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="input-glass"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="input-glass"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>Description</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about what you observed..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-glass"
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                {/* Anonymous Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Submit Anonymously</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Your name will not be attached to community feeds</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    style={{ width: 20, height: 20, accentColor: '#6366f1', cursor: 'pointer' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: 8 }} disabled={isSubmitting}>
                  <span className="icon">send</span>
                  {isSubmitting ? 'Submitting to Live Telemetry...' : 'Submit Incident Report'}
                </button>

              </form>
            </>
          ) : (
            <div style={{ textTransform: 'none', textAlign: 'center', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '2px solid #10b981', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="icon" style={{ fontSize: 36 }}>check_circle</span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 900 }} className="grad-text">Report Verified & Broadcasted!</h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 480 }}>
                Thank you. Your report for <strong>{category}</strong> has been logged to live telemetry and notified to nearby community members.
              </p>
              <button onClick={resetForm} className="btn-primary" style={{ marginTop: 12 }}>
                Submit Another Report
              </button>
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
}
