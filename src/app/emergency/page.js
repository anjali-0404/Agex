'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { ShieldAlert, MapPin, Video, Share2, PhoneCall, Flashlight, Volume2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EmergencyPage() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(interval);
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleActivate = () => {
    setActive(!active);
  };

  return (
    <AppShell>
      <div className={`min-h-screen transition-colors duration-500 pb-24 ${active ? 'bg-red-950/40' : 'bg-transparent'}`}>
        {/* Top Bar */}
        <div className="p-4 flex justify-between items-center z-10 relative">
          <button onClick={() => router.back()} className="glass p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <XCircle size={24} />
          </button>
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${active ? 'bg-red-500 animate-ping' : 'bg-gray-400'}`}></div>
            <span className="font-bold text-sm text-white tracking-widest uppercase">{active ? 'LIVE SOS' : 'STANDBY'}</span>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Live Map / Central SOS Area */}
        <div className="relative w-full h-[35vh] flex items-center justify-center overflow-hidden mb-6">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at center, var(--primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>
          
          {/* Timer Display */}
          {active && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse">
              {formatTime(elapsed)}
            </div>
          )}

          {/* Massive SOS Button */}
          <div className="relative flex items-center justify-center">
            {active && (
              <>
                <div className="absolute w-40 h-40 bg-red-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="absolute w-56 h-56 bg-red-500/10 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
                <div className="absolute w-72 h-72 bg-red-500/5 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
              </>
            )}
            
            <button 
              onClick={handleActivate}
              className={`relative z-10 w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 ${
                active 
                ? 'bg-red-600 text-white shadow-[0_0_40px_rgba(239,68,68,0.6)] border-4 border-red-400' 
                : 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-[0_10px_25px_rgba(239,68,68,0.5)] border-4 border-white/20'
              }`}
            >
              <ShieldAlert size={40} className="mb-1" />
              <span className="font-black text-xl tracking-wider">{active ? 'CANCEL' : 'SOS'}</span>
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="px-4 mb-6">
          <h3 className="font-bold mb-3 text-sm uppercase tracking-wider text-gray-500">Emergency Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            <button className="glass rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Video size={22} className="text-blue-400" />
              <span className="text-[10px] font-bold text-center leading-tight">Record<br/>Evidence</span>
            </button>
            <button className="glass rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Share2 size={22} className="text-green-400" />
              <span className="text-[10px] font-bold text-center leading-tight">Share<br/>Location</span>
            </button>
            <button className="glass rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <PhoneCall size={22} className="text-purple-400" />
              <span className="text-[10px] font-bold text-center leading-tight">Fake<br/>Call</span>
            </button>
            <button className="glass rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Volume2 size={22} className="text-yellow-400" />
              <span className="text-[10px] font-bold text-center leading-tight">Loud<br/>Alarm</span>
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="px-4">
          <h3 className="font-bold mb-3 text-sm uppercase tracking-wider text-gray-500">Emergency Contacts</h3>
          <div className="space-y-3">
            {[
              { name: '911 Emergency', rel: 'Police / Medical', color: 'bg-red-500/20 text-red-500', icon: ShieldAlert },
              { name: 'Mom', rel: 'Primary Contact', color: 'bg-blue-500/20 text-blue-500', icon: PhoneCall },
              { name: 'Brother', rel: 'Secondary Contact', color: 'bg-green-500/20 text-green-500', icon: PhoneCall },
            ].map((contact, i) => (
              <div key={i} className="glass rounded-xl p-4 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${contact.color}`}>
                    <contact.icon size={20} />
                  </div>
                  <div>
                    <div className="font-bold">{contact.name}</div>
                    <div className="text-xs text-gray-500">{contact.rel}</div>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <PhoneCall size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
