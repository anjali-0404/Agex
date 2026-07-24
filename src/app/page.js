'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Bell, Shield, Navigation, AlertTriangle, CloudRain, Activity, CheckCircle, X, Navigation2, Camera, PhoneCall, Volume2 } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [navigating, setNavigating] = useState(false);
  const [showSafetyDetail, setShowSafetyDetail] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', title: 'Streetlight Outage', time: '10 min ago', active: true },
    { id: 2, type: 'alert', title: 'Sidewalk Blocked', time: '32 min ago', active: true },
    { id: 3, type: 'info', title: 'Event Crowd', time: '1 hr ago', active: true },
  ]);
  const [weatherExpanded, setWeatherExpanded] = useState(false);

  const dismissAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: false } : a));
  };

  return (
    <AppShell>
      <div className="p-4 space-y-6 pb-24 max-w-lg mx-auto w-full">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-[var(--primary)]">
              <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold grad-text">Hi, Sarah</h1>
              <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                <Shield size={14} className="text-green-500" />
                <span>Aegis AI Active</span>
              </div>
            </div>
          </div>
          <button className="glass p-2 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-[var(--bg)]"></span>
          </button>
        </div>

        {/* Safety Index Gauge */}
        <div 
          className="glass rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => setShowSafetyDetail(!showSafetyDetail)}
        >
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-gray-700" />
              <circle cx="50" cy="50" r="40" stroke="var(--primary)" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 88 / 100)} className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black">88</span>
              <span className="text-xs text-gray-500 font-medium">/ 100</span>
            </div>
          </div>
          <h2 className="text-lg font-semibold">Good Safety Index</h2>
          <p className="text-sm text-gray-500 text-center mt-1">Your current area is generally safe based on real-time data.</p>
          
          {showSafetyDetail && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 w-full animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between text-sm mb-2"><span>Lighting</span> <span className="font-semibold text-green-500">Good</span></div>
              <div className="flex justify-between text-sm mb-2"><span>Foot Traffic</span> <span className="font-semibold text-yellow-500">Moderate</span></div>
              <div className="flex justify-between text-sm"><span>Historical Data</span> <span className="font-semibold text-green-500">Safe</span></div>
            </div>
          )}
        </div>

        {/* AI Route Suggestion */}
        <div className="glass rounded-2xl p-5 border border-[var(--primary)] shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-1 flex items-center gap-1">
                <Navigation2 size={12} /> Route Suggestion
              </div>
              <h3 className="font-bold text-lg">Evening Commute</h3>
              <p className="text-sm text-gray-500">Safest route via Main St. • 24 mins</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
              <Navigation size={20} />
            </div>
          </div>
          <button 
            className={`w-full py-3 rounded-xl font-bold transition-all ${navigating ? 'bg-green-500 text-white' : 'btn-primary'}`}
            onClick={() => setNavigating(!navigating)}
          >
            {navigating ? 'Navigation Active (Tap to end)' : 'Start Navigation'}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button className="glass rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-[var(--primary)]/10 transition-colors">
            <AlertTriangle size={24} className="text-yellow-500" />
            <span className="text-xs font-medium text-center">Report<br/>Incident</span>
          </button>
          <button className="glass rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-[var(--primary)]/10 transition-colors">
            <Navigation size={24} className="text-blue-500" />
            <span className="text-xs font-medium text-center">Plan<br/>Route</span>
          </button>
          <Link href="/emergency" className="rounded-xl p-3 flex flex-col items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
            <Shield size={24} />
            <span className="text-xs font-bold text-center">SOS<br/>Emergency</span>
          </Link>
        </div>

        {/* Weather Widget */}
        <div className="glass rounded-2xl p-5 cursor-pointer" onClick={() => setWeatherExpanded(!weatherExpanded)}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CloudRain size={28} className="text-blue-400" />
              <div>
                <div className="font-bold text-xl">68°F</div>
                <div className="text-sm text-gray-500">Partly Cloudy</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Safe to walk</div>
              <div className="text-xs text-gray-500">Visibility: Good</div>
            </div>
          </div>
          
          {weatherExpanded && (
            <div className="mt-4 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4 animate-in fade-in">
              {['Now', '8 PM', '9 PM', '10 PM'].map((time, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500">{time}</span>
                  <CloudRain size={16} className={i > 1 ? 'text-gray-400' : 'text-blue-400'} />
                  <span className="text-sm font-semibold">{68 - i}°</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nearby Alerts */}
        <div>
          <h3 className="font-bold mb-3 flex items-center justify-between">
            <span>Nearby Alerts</span>
            <span className="text-xs font-normal text-[var(--primary)] cursor-pointer hover:underline">Filter</span>
          </h3>
          <div className="space-y-3">
            {alerts.filter(a => a.active).map(alert => (
              <div key={alert.id} className="glass rounded-xl p-3 flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${alert.type === 'alert' ? 'bg-red-500/20 text-red-500' : alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </div>
                <button onClick={() => dismissAlert(alert.id)} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1">
                  <X size={16} />
                </button>
              </div>
            ))}
            {alerts.filter(a => a.active).length === 0 && (
              <div className="text-center p-4 text-sm text-gray-500 glass rounded-xl">No active alerts nearby.</div>
            )}
          </div>
        </div>

        {/* Area Safety Trend */}
        <div className="glass rounded-2xl p-5 mb-8">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Activity size={16}/> Area Safety Trend</h3>
          <div className="flex items-end justify-between h-24 gap-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
              const height = [60, 75, 85, 90, 70, 88, 95][i];
              return (
                <div key={i} className="flex flex-col items-center gap-2 group relative w-full">
                  <div className="w-full bg-[var(--primary)]/20 rounded-t-sm relative transition-all duration-300 group-hover:bg-[var(--primary)]" style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      {height}/100
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
