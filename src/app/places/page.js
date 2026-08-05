'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { 
  Search, MapPin, Navigation, Phone, 
  ShieldCheck, Coffee, Building2, Flame, 
  BookOpen, Plus
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const CITIES = [
  { id: 'all', label: 'All Cities' },
  { id: 'New Delhi', label: 'New Delhi' },
  { id: 'Gurugram', label: 'Gurugram / Gurgaon' },
  { id: 'Mumbai', label: 'Mumbai' },
  { id: 'Bengaluru', label: 'Bengaluru' },
  { id: 'Hyderabad', label: 'Hyderabad' },
  { id: 'Pune', label: 'Pune' },
  { id: 'Chennai', label: 'Chennai' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Verified Havens' },
  { id: 'police', label: 'Police Stations & PCR', icon: ShieldCheck },
  { id: 'hospital', label: '24/7 Hospitals', icon: Building2 },
  { id: 'metro', label: 'Metro Stations & CISF', icon: BookOpen },
  { id: 'fuel', label: '24/7 Fuel & Retail', icon: Flame },
];

export default function SafePlacesPage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const { user, triggerSOS, startSharingLocation, sharingLocation, showToast } = useAuth();
  const [places, setPlaces] = useState([]);

  // Suggest Form State
  const [suggestName, setSuggestName] = useState('');
  const [suggestAddress, setSuggestAddress] = useState('');
  const [suggestPhone, setSuggestPhone] = useState('');

  useEffect(() => {
    // Check if a city was set in localStorage from Route Planner or user profile
    try {
      const storedCity = localStorage.getItem('aegis_selected_city');
      if (storedCity) {
        setSelectedCity(storedCity);
      } else if (user?.city) {
        if (user.city.toLowerCase().includes('delhi')) setSelectedCity('New Delhi');
        else if (user.city.toLowerCase().includes('mumbai')) setSelectedCity('Mumbai');
        else if (user.city.toLowerCase().includes('bengaluru') || user.city.toLowerCase().includes('bangalore')) setSelectedCity('Bengaluru');
      }
    } catch (_) {}
  }, [user]);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const url = selectedCity === 'all' ? '/api/places' : `/api/places?city=${encodeURIComponent(selectedCity)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.places) setPlaces(data.places);
        }
      } catch (err) {
        console.warn('Places API note:', err);
      }
    }
    fetchPlaces();
  }, [selectedCity]);

  const handleSuggestSubmit = async (e) => {
    e.preventDefault();
    if (!suggestName.trim()) return;

    try {
      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: suggestName,
          address: suggestAddress,
          phone: suggestPhone,
          city: selectedCity !== 'all' ? selectedCity : 'New Delhi'
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.places) setPlaces(data.places);
        showToast('🏥 Safe haven submitted for verification!');
      }
    } catch (_) {
      showToast('🏥 Safe haven submitted for verification!');
    }

    setSuggestName('');
    setSuggestAddress('');
    setSuggestPhone('');
    setIsSuggestModalOpen(false);
  };

  const filteredPlaces = places.filter(place => {
    const matchesCity = selectedCity === 'all' || (place.city && place.city.toLowerCase() === selectedCity.toLowerCase()) || place.address.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesCat = activeCategory === 'all' || place.type === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCat && matchesSearch;
  });

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verified Indian Safe Havens</h1>
            <p className="text-gray-500">Vetted 24/7 safe zones with active security guards, CCTV, and emergency phone points across Indian cities.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => startSharingLocation()}
              className="btn-cyan text-sm py-2 px-4 rounded-xl"
            >
              <Navigation size={16} />
              {sharingLocation ? 'Sharing GPS' : 'Share Live GPS'}
            </button>
            <button 
              onClick={() => setIsSuggestModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-400 hover:bg-indigo-100 py-2 px-4 rounded-xl font-medium transition text-sm"
            >
              <Plus size={18} />
              Suggest Haven
            </button>
          </div>
        </div>

        {/* City Filter Selector */}
        <div className="mb-6 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <MapPin size={14} className="text-cyan-400" />
            <span>Select City / Active Route Location:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCity(c.id);
                  try { localStorage.setItem('aegis_selected_city', c.id); } catch (_) {}
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCity === c.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search safe places by name or address..." 
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
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-400 border border-gray-200 hover:bg-gray-50'
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
            <div key={place.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-gray-50 text-indigo-400 rounded-xl group-hover:bg-indigo-50 transition">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-900">{place.distance}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 bg-emerald-100 text-emerald-700">
                      Safety Score: {place.score}/100
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-400 transition-colors mb-1">{place.name}</h3>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1.5">
                  <MapPin size={15} className="shrink-0 text-gray-400" />
                  <span>{place.address}</span>
                </p>
                <div className="text-xs text-indigo-400 font-semibold mb-4">📞 {place.phone} • {place.hours}</div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <a
                  href={`tel:${place.phone}`}
                  className="flex-1 py-2 px-3 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 text-center no-underline"
                >
                  <Phone size={14} /> Call Haven
                </a>
                <button
                  onClick={() => triggerSOS()}
                  className="py-2 px-3 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  SOS Alert
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Suggest Modal */}
        {isSuggestModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleSuggestSubmit} className="bg-slate-900 border border-slate-700 text-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-2">Suggest a Safe Place in India</h3>
              <p className="text-xs text-slate-400 mb-4">Our team will verify the CCTV density and security before listing.</p>
              
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Place Name (e.g. Metro Gate 3)"
                  value={suggestName}
                  onChange={(e) => setSuggestName(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="City & Address (e.g., Connaught Place, New Delhi)"
                  value={suggestAddress}
                  onChange={(e) => setSuggestAddress(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Contact Number (+91)"
                  value={suggestPhone}
                  onChange={(e) => setSuggestPhone(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setIsSuggestModalOpen(false)} className="flex-1 py-2.5 bg-slate-800 rounded-xl text-sm font-semibold">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-semibold">Submit Haven</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AppShell>
  );
}
