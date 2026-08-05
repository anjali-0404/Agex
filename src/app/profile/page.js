'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { 
  User, Shield, Settings, Bell, 
  MapPin, Phone, AlertTriangle, 
  Plus, Edit2, Trash2, X, Check, Lock, LogOut, KeyRound, Sparkles, Mail
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
];

export default function ProfilePage() {
  const { user, contacts, addContact, deleteContact, updateProfile, logout, startSharingLocation, sharingLocation, showToast } = useAuth();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(user?.name || 'Ananya Sharma');
  const [editEmail, setEditEmail] = useState(user?.email || 'ananya.sharma@aegis.in');
  const [editPhone, setEditPhone] = useState(user?.phone || '+91 98765 43210');
  const [editCity, setEditCity] = useState(user?.city || 'New Delhi, Delhi NCR');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || AVATAR_OPTIONS[0]);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRelation, setContactRelation] = useState('Family');

  // Preferences State
  const [preferences, setPreferences] = useState({
    autoSos: true,
    locationSharing: true,
    audioSurveillance: true,
    nightWalkMode: true,
    e2eeBroadcast: true
  });

  const togglePreference = (key) => {
    setPreferences(prev => {
      const next = { ...prev, [key]: !prev[key] };
      showToast(`Preference '${key}' ${next[key] ? 'Enabled' : 'Disabled'}`);
      return next;
    });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      city: editCity,
      avatar: editAvatar
    });
    setIsEditModalOpen(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    addContact({ name: contactName, phone: contactPhone, relation: contactRelation });
    setContactName('');
    setContactPhone('');
    setShowAddContact(false);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Profile Banner */}
        <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden text-white shadow-2xl border border-slate-800">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* Avatar with Status Glow */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full border-2 border-cyan-400 p-1 bg-slate-900 shadow-2xl overflow-hidden">
                <img 
                  src={user?.avatar || AVATAR_OPTIONS[0]} 
                  alt={user?.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center shadow-lg">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl md:text-3xl font-black text-white">{user?.name || 'Ananya Sharma'}</h1>
                <span className="badge badge-e2ee">
                  <Lock size={12} /> E2EE AES-256 Verified
                </span>
                <span className="badge badge-safe">
                  <span className="pulse-dot pulse-dot-green" /> Session Active
                </span>
              </div>

              <p className="text-slate-300 text-sm flex items-center justify-center md:justify-start gap-3 flex-wrap">
                <span className="flex items-center gap-1 font-semibold text-cyan-300">
                  <MapPin size={15} /> {user?.city || 'New Delhi, Delhi NCR'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Phone size={15} className="text-cyan-400" /> {user?.phone || '+91 98765 43210'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Mail size={15} className="text-indigo-400" /> {user?.email || 'ananya.sharma@aegis.in'}
                </span>
              </p>

              <div className="text-xs text-slate-400 pt-1 font-mono">
                Fingerprint: <span className="text-emerald-400 font-bold">{user?.encryptionKeyFingerprint || 'aegis-sha256-e2ee-india-7890x'}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="btn-glass text-xs"
              >
                <Edit2 size={14} /> Edit Profile
              </button>
              <button 
                onClick={logout}
                className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-full text-xs font-extrabold transition flex items-center gap-1.5"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>

          </div>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left 2 Columns: Saved Emergency Contacts */}
          <div className="md:col-span-2 space-y-6">
            
            <div className="glass p-6 text-white space-y-5">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Phone size={20} className="text-cyan-400" /> Emergency Dispatch Contacts
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Recipients of instant 1-click SOS broadcast & live E2EE GPS link</p>
                </div>
                <button 
                  onClick={() => setShowAddContact(!showAddContact)}
                  className="btn-cyan text-xs py-2 px-4 rounded-xl"
                >
                  <Plus size={16} /> Add Contact
                </button>
              </div>

              {/* Add Contact Modal / Sub-form */}
              {showAddContact && (
                <form onSubmit={handleAddSubmit} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3.5 animate-in">
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">New Emergency Contact</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Contact Name (e.g. Papa, Rohan)"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Mobile (+91 98765 43210)"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full text-sm"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={contactRelation} 
                      onChange={(e) => setContactRelation(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2"
                    >
                      <option value="Family">Family</option>
                      <option value="Friend">Friend</option>
                      <option value="Work">Work colleague</option>
                      <option value="Helpline">Helpline</option>
                    </select>
                    <button type="submit" className="btn-cyan text-xs py-2 px-5 rounded-xl flex-1 justify-center">
                      Save Contact
                    </button>
                    <button type="button" onClick={() => setShowAddContact(false)} className="btn-glass text-xs py-2 px-4">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              
              {/* Contact List */}
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900/80 rounded-2xl border border-slate-800/80 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-extrabold text-sm shrink-0">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white flex items-center gap-2 text-sm">
                          {contact.name}
                          {contact.priority === 1 && (
                            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Primary Target
                            </span>
                          )}
                        </h4>
                        <p className="text-cyan-400 text-xs mt-0.5 font-mono font-semibold">📞 {contact.phone} • <span className="text-slate-400">{contact.relation}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a href={`tel:${contact.phone}`} className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3.5 py-1.5 rounded-xl font-bold no-underline hover:bg-emerald-500/30 transition">
                        Call
                      </a>
                      {contact.id.startsWith('c_') && (
                        <button onClick={() => deleteContact(contact.id)} className="p-1.5 text-slate-500 hover:text-rose-400 transition">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E2EE Key Security card */}
            <div className="glass p-6 text-white space-y-3">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Lock size={20} className="text-emerald-400" /> End-to-End Encryption Hardware State
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                All coordinates, SOS payloads, and voice logs are encrypted using AES-GCM 256-bit client keys generated directly on device. Neither telecom providers nor raw servers can intercept your real-time payload.
              </p>
              <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 break-all flex items-center justify-between">
                <span>Fingerprint: {user?.encryptionKeyFingerprint || 'aegis-sha256-e2ee-india-7890x'}</span>
                <span className="badge badge-safe text-[10px]">Verified</span>
              </div>
            </div>

          </div>

          {/* Right Column: Safety Preferences */}
          <div className="space-y-6">
            <div className="glass p-6 text-white space-y-5">
              <h3 className="text-lg font-black flex items-center gap-2">
                <Settings size={20} className="text-indigo-400" /> Safety Telemetry Toggles
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/40 transition">
                  <div>
                    <div className="text-xs font-bold text-white">Auto-SOS Fall Detection</div>
                    <div className="text-[11px] text-slate-400">Triggers alert on severe deceleration</div>
                  </div>
                  <button onClick={() => togglePreference('autoSos')} className={`w-11 h-6 rounded-full transition-colors relative ${preferences.autoSos ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${preferences.autoSos ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/40 transition">
                  <div>
                    <div className="text-xs font-bold text-white">Realtime GPS Sync</div>
                    <div className="text-[11px] text-slate-400">Broadcast satellite lock</div>
                  </div>
                  <button onClick={() => togglePreference('locationSharing')} className={`w-11 h-6 rounded-full transition-colors relative ${preferences.locationSharing ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${preferences.locationSharing ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/40 transition">
                  <div>
                    <div className="text-xs font-bold text-white">Night Corridor Alert</div>
                    <div className="text-[11px] text-slate-400">High CCTV density routes</div>
                  </div>
                  <button onClick={() => togglePreference('nightWalkMode')} className={`w-11 h-6 rounded-full transition-colors relative ${preferences.nightWalkMode ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${preferences.nightWalkMode ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Share GPS Banner */}
            <div className="glass p-5 text-center space-y-3 border-l-4 border-cyan-400">
              <div className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">Live GPS Broadcast</div>
              <p className="text-xs text-slate-300">Share your live encrypted location route link with loved ones.</p>
              <button 
                onClick={() => startSharingLocation()} 
                className="btn-cyan w-full justify-center text-xs py-3"
              >
                {sharingLocation ? 'GPS Sharing Active' : 'Broadcast Live GPS Link'}
              </button>
            </div>
          </div>

        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in">
            <div className="glass max-w-lg w-full p-6 md:p-8 space-y-6 border border-slate-700 relative">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Edit2 size={22} className="text-cyan-400" /> Edit Sentinel Profile
              </h2>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Avatar Selection</label>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {AVATAR_OPTIONS.map((url) => (
                      <img 
                        key={url} 
                        src={url} 
                        alt="Avatar Option"
                        onClick={() => setEditAvatar(url)}
                        className={`w-12 h-12 rounded-full object-cover cursor-pointer border-2 transition ${editAvatar === url ? 'border-cyan-400 scale-110 shadow-lg shadow-cyan-400/30' : 'border-transparent opacity-60 hover:opacity-100'}`} 
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Full Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <input 
                    type="email" 
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                    className="w-full text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Mobile Number (+91)</label>
                  <input 
                    type="text" 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    required
                    className="w-full text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">City / Region</label>
                  <input 
                    type="text" 
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    required
                    className="w-full text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-cyan flex-1 justify-center py-3 text-xs">
                    Save Profile Changes
                  </button>
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn-glass py-3 text-xs">
                    Cancel
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}

