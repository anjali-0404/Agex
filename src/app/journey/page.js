'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { 
  Navigation, ShieldAlert, CheckCircle2, 
  Clock, MapPin, BellRing, Phone
} from 'lucide-react';

export default function JourneyPage() {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock progress simulation
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 100 : p + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Your Journey</h1>
          <p className="text-gray-500">Share your route and get real-time protection.</p>
        </div>

        {!isActive ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Navigation className="text-blue-600" /> Plan Journey
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="e.g. Central Station" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                      <option>15 mins</option>
                      <option>30 mins</option>
                      <option>1 hour</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Transit</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option>Walking</option>
                    <option>Public Transit</option>
                    <option>Rideshare / Taxi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Selected Guardians</label>
                <div className="flex gap-2">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 border border-blue-100">
                    <CheckCircle2 size={14} /> Mom
                  </div>
                  <div className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 border border-gray-200 border-dashed hover:bg-gray-100 cursor-pointer">
                    + Add Guardian
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsActive(true)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Start Protected Journey
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active Monitor */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-500 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-100">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center mb-6 mt-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Tracking Active
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">En route to Central Station</h2>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-blue-600">12:45</p>
                  <p className="text-xs text-gray-500 font-medium">MINUTES REMAINING</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between mb-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                    <BellRing size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Next Check-in</p>
                    <p className="text-xs text-gray-500">in 5 minutes</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                  Extend Time
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsActive(false)}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors"
                >
                  <CheckCircle2 size={20} /> I'm Safe
                </button>
                <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors animate-pulse">
                  <ShieldAlert size={20} /> SOS Alarm
                </button>
              </div>
            </div>
            
            {/* Guardians Viewing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?u=mom" alt="Mom" />
                </div>
                <p className="text-sm font-medium text-gray-700">Mom is watching your journey</p>
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"><Phone size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
