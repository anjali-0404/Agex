'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';

export default function RoutePlanner() {
  const [origin, setOrigin] = useState('Current Location (State St)');
  const [destination, setDestination] = useState('Downtown Metro Station');
  const [mode, setMode] = useState('walk');
  const [selectedRoute, setSelectedRoute] = useState('safest');

  const routes = [
    {
      id: 'safest',
      name: 'Safest Route',
      badge: 'RECOMMENDED',
      badgeColor: '#22d3ee',
      riskScore: '12/100',
      riskText: 'Very Low Risk',
      distance: '2.4 mi',
      time: '45 min',
      features: ['Excellent Lighting', 'High Police Presence', 'CCTV Coverage'],
      steps: [
        'Head north on State St (Well-lit walkway)',
        'Turn right onto E Madison St (Police station nearby)',
        'Arrive at Downtown Metro Station (24/7 Security)'
      ],
      pathColor: '#6366f1'
    },
    {
      id: 'fastest',
      name: 'Fastest Route',
      badge: 'FASTEST',
      badgeColor: '#a855f7',
      riskScore: '45/100',
      riskText: 'Moderate Risk',
      distance: '1.8 mi',
      time: '35 min',
      features: ['Fair Lighting', 'Moderate Foot Traffic'],
      steps: [
        'Head north on State St',
        'Cut through Pine Alley (Limited lighting)',
        'Arrive at Station'
      ],
      pathColor: '#a855f7'
    },
    {
      id: 'shortest',
      name: 'Shortest Route',
      badge: 'DIRECT',
      badgeColor: '#ef4444',
      riskScore: '65/100',
      riskText: 'Higher Risk',
      distance: '1.5 mi',
      time: '38 min',
      features: ['Poor Lighting', 'Isolated Areas at Night'],
      steps: [
        'Head through Park East Path (Unlit after 8 PM)',
        'Arrive at Station'
      ],
      pathColor: '#ef4444'
    }
  ];

  const currentRoute = routes.find(r => r.id === selectedRoute);

  return (
    <AppShell>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
        
        {/* Left Panel: Inputs & Suggested Routes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Header & Input Card */}
          <div className="glass animate-in" style={{ padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16 }} className="grad-text">
              Smart Route Planner
            </h1>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', left: 14, top: 14, color: '#10b981', fontSize: 18 }}>my_location</span>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="input-glass"
                  style={{ paddingLeft: 44 }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <span className="icon" style={{ position: 'absolute', left: 14, top: 14, color: '#ef4444', fontSize: 18 }}>location_on</span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="input-glass"
                  style={{ paddingLeft: 44 }}
                />
              </div>

              {/* Mode Selectors */}
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                {['walk', 'bike', 'drive'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    style={{
                      flex: 1, padding: '10px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                      background: mode === m ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                      border: mode === m ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                      color: mode === m ? '#6366f1' : '#94a3b8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textTransform: 'capitalize'
                    }}>
                    <span className="icon" style={{ fontSize: 18 }}>
                      {m === 'walk' ? 'directions_walk' : m === 'bike' ? 'directions_bike' : 'directions_car'}
                    </span>
                    {m}
                  </button>
                ))}
              </div>

              <button className="btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
                <span className="icon">alt_route</span> Calculate Safe Routes
              </button>
            </div>
          </div>

          {/* Suggested Routes Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, paddingLeft: 4 }}>Suggested Routes</h3>

            {routes.map((r) => {
              const isSelected = selectedRoute === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRoute(r.id)}
                  className="glass"
                  style={{
                    padding: 20, cursor: 'pointer',
                    borderColor: isSelected ? r.pathColor : 'rgba(255,255,255,0.1)',
                    background: isSelected ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                    boxShadow: isSelected ? `0 0 20px ${r.pathColor}40` : 'none'
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="icon" style={{ color: r.pathColor, fontSize: 24 }}>shield</span>
                      <h4 style={{ fontSize: 16, fontWeight: 700 }}>{r.name}</h4>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: `${r.badgeColor}20`, color: r.badgeColor, border: `1px solid ${r.badgeColor}40` }}>
                      {r.badge}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 13 }}>
                    <div><span style={{ color: 'var(--text-muted)' }}>Risk: </span><strong style={{ color: r.pathColor }}>{r.riskScore}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Dist: </span><strong>{r.distance}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Time: </span><strong>{r.time}</strong></div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                    {r.features.map((f, idx) => (
                      <span key={idx} style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 8, color: 'var(--text-secondary)' }}>
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Map Preview & Step-by-Step Directions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Interactive Map Overlay */}
          <div style={{ position: 'relative', width: '100%', height: 380, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFH1gQN3ivIfo406pZou4OlEvMxF0ledtBwRpHG2xw7jf3oZ9u658godOBpix4n5xS-zALv8-D32moi3KXE3tZ7WTAODxhHkdKMoalNq9mogb2JkChIHgqFevRBRz4_UiRDg1Wn0NkW4g3WGDbDFZE96CKzmqL0aItly5_Ch9HBJNGxL5mYpGS7rizsUx4FfTQt9e4X0rbA9LO4o41azsA6U6MBgeXnVgooftn4geeROP_cc-_oF7M4vN3AWjVsFrc2LtgUaJCxopF')`,
              backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6) contrast(1.2)'
            }} />

            {/* SVG Path line overlay */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <path
                d="M 50 300 Q 180 180 320 80"
                fill="none"
                stroke={currentRoute.pathColor}
                strokeWidth="6"
                strokeDasharray="8 4"
                style={{ filter: `drop-shadow(0 0 10px ${currentRoute.pathColor})` }}
              />
            </svg>

            <div className="glass" style={{ position: 'absolute', bottom: 16, left: 16, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              <span className="pulse-dot" style={{ background: currentRoute.pathColor }} />
              <strong>{currentRoute.name}</strong> • {currentRoute.time} ({currentRoute.distance})
            </div>
          </div>

          {/* Turn-by-Turn Directions */}
          <div className="glass animate-in delay-2" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="icon" style={{ color: '#6366f1' }}>turn_right</span> Step-by-Step Directions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {currentRoute.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', items: 'flex-start', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', border: '1px solid #6366f1', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)', paddingTop: 4 }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
