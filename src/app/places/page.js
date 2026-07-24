'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { 
  Search, MapPin, Navigation, Phone, 
  ShieldCheck, Coffee, Building2, Flame, 
  BookOpen, Plus
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Places' },
  { id: 'police', label: 'Police Stations', icon: ShieldCheck },
  { id: 'hospital', label: '24/7 Hospitals', icon: Building2 },
  { id: 'cafe', label: 'Open Cafes', icon: Coffee },
  { id: 'fire', label: 'Fire Stations', icon: Flame },
  { id: 'library', label: 'Libraries', icon: BookOpen },
];

const PLACES = [
  { id: 1, name: 'Central Police Precinct', type: 'police', distance: '0.8 mi', score: 99, address: '100 Main St', hours: 'Open 24/7' },
  { id: 2, name: 'Mercy General Hospital', type: 'hospital', distance: '1.2 mi', score: 95, address: '450 Health Way', hours: 'Open 24/7' },
  { id: 3, name: 'Starlight Diner', type: 'cafe', distance: '0.3 mi', score: 82, address: '88 Neon Blvd', hours: 'Open until 2AM' },
  { id: 4, name: 'Engine Co. 42', type: 'fire', distance: '1.5 mi', score: 94, address: '500 Firehouse Rd', hours: 'Open 24/7' },
];

export default function SafePlacesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  const filteredPlaces = PLACES.filter(place => {
    const matchesCat = activeCategory === 'all' || place.type === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verified Safe Places</h1>
            <p className="text-gray-500">Find vetted safe havens nearby in case of emergency.</p>
          </div>
          <button 
            onClick={() => setIsSuggestModalOpen(true)}
            className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg font-medium transition"
          >
            <Plus size={18} />
            Suggest a Place
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search safe places..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat.icon && <cat.icon size={16} />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map(place => (
            <div key={place.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 text-gray-700 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-900">{place.distance}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                    place.score >= 90 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Score: {place.score}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{place.name}</h3>
              <p className="text-gray-500 text-sm flex items-center gap-1 mb-1">
                <MapPin size={14} /> {place.address}
              </p>
              <p className="text-gray-400 text-xs mb-6">{place.hours}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                  <Navigation size={16} /> Navigate
                </button>
                <button className="w-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition">
                  <Phone size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
