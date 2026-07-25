'use client';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [exported, setExported] = useState(false);

  const kpis = [
    { title: 'Overall Safety Score', value: '88/100', trend: '+2%', isPositive: true, icon: 'shield', color: '#10b981' },
    { title: 'Incidents This Week', value: '12', trend: '-25%', isPositive: true, icon: 'warning', color: '#f59e0b' },
    { title: 'Safe Journeys Logged', value: '147', trend: '+14%', isPositive: true, icon: 'directions_walk', color: '#6366f1' },
    { title: 'Community Trust Rate', value: '94%', trend: '+1%', isPositive: true, icon: 'verified', color: '#22d3ee' },
  ];

  const areaData = [
    { zone: 'North Precinct', score: 65, height: '65%' },
    { zone: 'South Corridor', score: 45, height: '45%' },
    { zone: 'East Waterfront', score: 80, height: '80%' },
    { zone: 'West Side', score: 50, height: '50%' },
    { zone: 'Downtown', score: 95, height: '95%', highlight: true },
    { zone: 'Suburbs', score: 75, height: '75%' },
    { zone: 'Campus', score: 85, height: '85%' },
  ];

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900 }} className="grad-text">Safety Analytics</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
              Comprehensive real-time telemetry and incident breakdown
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-glass"
              style={{ padding: '8px 16px', borderRadius: 20, width: 'auto' }}>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="1y">Past Year</option>
            </select>

            <button onClick={handleExport} className="btn-primary">
              <span className="icon">download</span> {exported ? 'Exporting PDF...' : 'Export Report'}
            </button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {kpis.map((k, idx) => (
            <div key={idx} className="glass animate-in" style={{ padding: 24, animationDelay: `${idx * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${k.color}20`, border: `1px solid ${k.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color }}>
                  <span className="icon" style={{ fontSize: 22 }}>{k.icon}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 12, background: k.isPositive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: k.isPositive ? '#10b981' : '#ef4444' }}>
                  {k.trend}
                </span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, marginTop: 16, color: '#f1f5f9' }}>{k.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{k.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          
          {/* Area Safety Breakdown Bar Chart */}
          <div className="glass animate-in delay-2" style={{ padding: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Area Safety Breakdown</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24 }}>Zone safety index score out of 100</p>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 180, gap: 12 }}>
              {areaData.map((item, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: item.highlight ? '#22d3ee' : 'var(--text-muted)' }}>{item.score}</span>
                  <div style={{
                    width: '100%',
                    height: item.height,
                    borderRadius: 8,
                    background: item.highlight
                      ? 'linear-gradient(180deg, #22d3ee, #6366f1)'
                      : 'linear-gradient(180deg, rgba(99,102,241,0.4), rgba(99,102,241,0.15))',
                    boxShadow: item.highlight ? '0 0 16px rgba(34,211,238,0.5)' : 'none',
                    transition: 'all 0.5s ease'
                  }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }}>
                    {item.zone}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Incident Heatmap Matrix */}
          <div className="glass animate-in delay-3" style={{ padding: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Incident Heatmap (Weekly)</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Incident risk distribution by time slot</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dIdx) => (
                <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 36 }}>{day}</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, flex: 1 }}>
                    {['Morning', 'Afternoon', 'Evening', 'Night'].map((time, tIdx) => {
                      const risk = (dIdx + tIdx * 2) % 3;
                      const bg = risk === 0 ? 'rgba(16,185,129,0.2)' : risk === 1 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.4)';
                      return (
                        <div key={time} style={{ background: bg, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={`${day} ${time}`} />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
  );
}
