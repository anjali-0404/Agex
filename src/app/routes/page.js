'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { MapPin, ArrowDownUp, Navigation, ShieldCheck, Clock, Zap, AlertOctagon } from 'lucide-react';

export default function SmartRoutePlannerPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('Walk');
  const [selectedRoute, setSelectedRoute] = useState(1); // route id

  const routes = [
    {
      id: 1,
      type: 'Safest Route',
      badge: 'Recommended',
      riskScore: 12,
      distance: '2.4 mi',
      duration: '45 min',
      features: ['Excellent Lighting', 'High Police presence', 'Security Cameras'],
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      icon: ShieldCheck
    },
    {
      id: 2,
      type: 'Fastest Route',
      riskScore: 45,
      distance: '1.8 mi',
      duration: '35 min',
      features: ['Fair Lighting', 'Moderate Foot Traffic'],
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      icon: Zap
    },
    {
      id: 3,
      type: 'Shortest Route',
      riskScore: 65,
      distance: '1.5 mi',
      duration: '38 min',
      features: ['Poor Lighting', 'Isolated Areas', 'Avoid at night'],
      color: 'border-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      icon: AlertOctagon
    }
  ];

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-64px)] w-full bg-white overflow-hidden">
        
        {/* Left Panel: Controls & List */}
        <div className="w-full md:w-1/3 lg:w-[400px] bg-white border-r border-gray-200 flex flex-col h-full shadow-lg z-10">
          
          {/* Planner Form */}
          <div className="p-6 bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Navigation className="text-blue-600" />
              Smart Route Planner
            </h2>
            
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                <input 
                  type="text" 
                  placeholder="Starting point..." 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full outline-none text-sm text-gray-700 bg-transparent"
                />
              </div>
              
              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <MapPin className="text-red-500 mr-2" size={16} />
                <input 
                  type="text" 
                  placeholder="Destination..." 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full outline-none text-sm text-gray-700 bg-transparent"
                />
              </div>

              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-colors z-10">
                <ArrowDownUp size={14} />
              </button>
            </div>

            <div className="flex bg-gray-100 p-1 rounded-xl mt-4">
              {['Walk', 'Bike', 'Drive'].map(mode => (
                <button 
                  key={mode}
                  onClick={() => setTransportMode(mode)}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    transportMode === mode ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition-all active:scale-[0.98]">
              Calculate Safe Routes
            </button>
          </div>

          {/* Suggested Routes List */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Suggested Routes</h3>
            <div className="flex flex-col gap-3">
              {routes.map(route => {
                const Icon = route.icon;
                const isSelected = selectedRoute === route.id;
                return (
                  <div 
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected ? `${route.color} ${route.bgColor} shadow-md scale-[1.02]` : 'border-transparent bg-white hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={route.textColor} size={20} />
                        <h4 className={`font-bold ${isSelected ? route.textColor : 'text-gray-800'}`}>{route.type}</h4>
                      </div>
                      {route.badge && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
                          {route.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Risk Score</span>
                        <span className={`font-bold ${
                          route.riskScore < 30 ? 'text-green-600' : route.riskScore < 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {route.riskScore}/100
                        </span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Distance</span>
                        <span className="font-semibold text-gray-700">{route.distance}</span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Time</span>
                        <span className="font-semibold text-gray-700">{route.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {route.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/60 border border-gray-100 text-gray-600 text-[11px] rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-gray-200/50 animate-in fade-in slide-in-from-top-2">
                        <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          <Clock size={14} /> Step-by-step
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-2 relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-blue-200">
                          <li className="relative pl-6">
                            <span className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Head north on State St
                          </li>
                          <li className="relative pl-6">
                            <span className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Turn right onto E Madison St (Well-lit area)
                          </li>
                          <li className="relative pl-6">
                            <span className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Arrive at destination
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Map View */}
        <div className="hidden md:block flex-1 relative bg-gray-100">
          {/* Map Background Mock */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80"
            style={{ 
              backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDwVsANG2pa0DOLU64Q2iqGxN8DMkbV5IeoCn_xp-Aj2eWNGCR9MzfmaRi1DEpjQ8KDCPyWnuI7fR25If5wQel-p911EukWZX8wDGhOd7YFjPaavLkrfGjGyjMjh7_meGeGuyopc2a-17wCwwRuwSI3zeJuCIrc8TO4TpFoSh1iBRecdK3lFDnQDBETaNht9shj-qGuzY_6xSKEs24mjggZx1xHg8_KQ1xX9H0-OCxYjv6AQwDT2ICqkDOhpXESaKiO8VE6S8xAFos0)' 
            }}
          />
          
          {/* SVG Route Overlays based on selectedRoute */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-xl z-10" preserveAspectRatio="none">
            {selectedRoute === 1 && (
              <>
                <path d="M 200 600 C 300 500, 400 300, 600 200" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" className="animate-[dash_3s_linear_infinite]" strokeDasharray="20 10" />
                <circle cx="200" cy="600" r="10" fill="#3b82f6" stroke="white" strokeWidth="3" />
                <circle cx="600" cy="200" r="10" fill="#ef4444" stroke="white" strokeWidth="3" />
              </>
            )}
            {selectedRoute === 2 && (
              <>
                <path d="M 200 600 C 250 400, 500 250, 600 200" fill="none" stroke="#a855f7" strokeWidth="8" strokeLinecap="round" strokeDasharray="15 15" />
                <circle cx="200" cy="600" r="10" fill="#3b82f6" stroke="white" strokeWidth="3" />
                <circle cx="600" cy="200" r="10" fill="#ef4444" stroke="white" strokeWidth="3" />
              </>
            )}
            {selectedRoute === 3 && (
              <>
                <path d="M 200 600 L 600 200" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 10" />
                <circle cx="200" cy="600" r="10" fill="#3b82f6" stroke="white" strokeWidth="3" />
                <circle cx="600" cy="200" r="10" fill="#ef4444" stroke="white" strokeWidth="3" />
              </>
            )}
          </svg>

          {/* Map Overlay Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
              <span className="text-xl font-bold">+</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
              <span className="text-xl font-bold">-</span>
            </button>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
