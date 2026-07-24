'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Search, MapPin, Shield, AlertTriangle, Moon, Users, MessageSquare, Layers } from 'lucide-react';

export default function InteractiveMapPage() {
  const [activeFilters, setActiveFilters] = useState(['Safe Routes']);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const filters = ['Safe Routes', 'Night Mode', 'Incidents', 'Police Stations', 'Safe Havens'];

  const markers = [
    { id: 1, type: 'Police Station', title: 'Chicago Police Dept - District 1', x: '45%', y: '40%', icon: Shield, color: 'text-blue-500' },
    { id: 2, type: '24/7 Safe Haven', title: 'Downtown Safe Haven', x: '60%', y: '55%', icon: MapPin, color: 'text-green-500' },
    { id: 3, type: 'Lighting Alert', title: 'Poor Street Lighting', x: '35%', y: '65%', icon: Moon, color: 'text-yellow-500' },
    { id: 4, type: 'Crowd Event', title: 'Large Crowd Gathering', x: '70%', y: '30%', icon: Users, color: 'text-purple-500' },
    { id: 5, type: 'Incident', title: 'Recent Incident Reported', x: '50%', y: '75%', icon: AlertTriangle, color: 'text-red-500' },
  ];

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <AppShell>
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-gray-900">
        
        {/* Map Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500"
          style={{ 
            backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDwVsANG2pa0DOLU64Q2iqGxN8DMkbV5IeoCn_xp-Aj2eWNGCR9MzfmaRi1DEpjQ8KDCPyWnuI7fR25If5wQel-p911EukWZX8wDGhOd7YFjPaavLkrfGjGyjMjh7_meGeGuyopc2a-17wCwwRuwSI3zeJuCIrc8TO4TpFoSh1iBRecdK3lFDnQDBETaNht9shj-qGuzY_6xSKEs24mjggZx1xHg8_KQ1xX9H0-OCxYjv6AQwDT2ICqkDOhpXESaKiO8VE6S8xAFos0)',
            opacity: showHeatmap ? 0.7 : 1
          }}
        />

        {/* Heatmap Overlay */}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
               style={{
                 background: 'radial-gradient(circle at 50% 50%, rgba(255,0,0,0.6) 0%, rgba(255,255,0,0.4) 30%, rgba(0,255,0,0.2) 70%, transparent 100%)'
               }}
          />
        )}

        {/* Floating Search & Filters */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-2 flex items-center border border-gray-200 mb-3">
            <Search className="text-gray-400 ml-3 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Search for safe locations, routes, or areas..." 
              className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 py-2"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md backdrop-blur-sm ${
                  activeFilters.includes(filter) 
                    ? 'bg-blue-600 text-white border-transparent' 
                    : 'bg-white/80 text-gray-700 border border-gray-300 hover:bg-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Heatmap Toggle */}
        <button 
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`absolute top-24 right-4 z-10 p-3 rounded-full shadow-lg backdrop-blur-md transition-all ${
            showHeatmap ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
          }`}
          title="Toggle Risk Heatmap"
        >
          <Layers size={24} />
        </button>

        {/* Markers */}
        {markers.map(marker => {
          const Icon = marker.icon;
          return (
            <div 
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: marker.x, top: marker.y }}
              onClick={() => setSelectedMarker(marker.id)}
            >
              <div className={`p-2 bg-white rounded-full shadow-lg border-2 border-white transition-transform duration-300 ${marker.id === selectedMarker ? 'scale-125' : 'hover:scale-110'}`}>
                <Icon className={marker.color} size={20} />
              </div>
              
              {/* Tooltip */}
              {selectedMarker === marker.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-48 bg-white rounded-xl shadow-xl p-3 z-20 border border-gray-100 animate-in fade-in zoom-in duration-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={marker.color} size={16} />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{marker.type}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">{marker.title}</h4>
                  <button className="mt-2 w-full py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* AI Assistant FAB */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end">
          {isAiChatOpen && (
            <div className="mb-4 w-72 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield size={18} />
                  <span className="font-semibold">Aegis AI Assistant</span>
                </div>
                <button onClick={() => setIsAiChatOpen(false)} className="text-white/80 hover:text-white">&times;</button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="bg-blue-100 text-blue-800 p-3 rounded-lg rounded-tl-none max-w-[85%] text-sm mb-3">
                  Hi! I'm scanning the map. Do you need a safe route or incident updates?
                </div>
              </div>
              <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input type="text" placeholder="Ask anything..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setIsAiChatOpen(!isAiChatOpen)}
            className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <Shield size={28} />
          </button>
        </div>

      </div>
    </AppShell>
  );
}
