'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { 
  User, Shield, Settings, Bell, 
  MapPin, Phone, AlertTriangle, 
  Plus, Edit2, Trash2, X, Check
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    autoSos: true,
    locationSharing: true,
    audioSurveillance: false,
    nightWalkMode: true,
  });

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', phone: '+1 234 567 8900', priority: 1 },
    { id: 2, name: 'David (Brother)', phone: '+1 987 654 3210', priority: 2 },
  ]);

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="relative z-10 w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md mt-8 md:mt-12 flex-shrink-0">
            <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Johnson" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 text-center md:text-left md:mt-12 flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center">
                <Shield size={12} className="mr-1" /> Premium Member
              </span>
            </div>
            <p className="text-gray-500 mt-1 flex items-center justify-center md:justify-start gap-1">
              <MapPin size={16} /> San Francisco, CA
            </p>
          </div>
          
          <div className="relative z-10 md:mt-12">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition flex items-center gap-2"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Trusted Contacts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Phone size={20} className="text-blue-500" /> Trusted Contacts
                </h2>
                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                {contacts.map(contact => (
                  <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        {contact.name}
                        {contact.priority === 1 && <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">Primary</span>}
                      </h4>
                      <p className="text-gray-500 text-sm">{contact.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-blue-600 transition"><Edit2 size={18} /></button>
                      <button onClick={() => removeContact(contact.id)} className="text-gray-400 hover:text-red-600 transition"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <Settings size={20} className="text-gray-500" /> Safety Preferences
              </h2>
              
              <div className="space-y-6">
                {Object.entries({
                  autoSos: { label: 'Auto SOS on Fall Detection', desc: 'Automatically alert contacts if a hard fall is detected' },
                  locationSharing: { label: 'Live Location Sharing', desc: 'Share location with contacts during active journeys' },
                  audioSurveillance: { label: 'Audio Surveillance Mode', desc: 'Record ambient audio when danger is suspected' },
                  nightWalkMode: { label: 'Night Walk Companion Alerts', desc: 'Periodic check-ins required during late hours' },
                }).map(([key, setting]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{setting.label}</h4>
                      <p className="text-sm text-gray-500">{setting.desc}</p>
                    </div>
                    <button 
                      onClick={() => togglePreference(key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${preferences[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Stats Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Activity Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-gray-600">Journeys Tracked</span>
                  <span className="font-bold text-gray-900">42</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-gray-600">SOS Triggers</span>
                  <span className="font-bold text-gray-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Community Reports</span>
                  <span className="font-bold text-gray-900">3</span>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 border-t-4 border-t-red-500">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-red-500" /> Danger Zone
              </h3>
              <p className="text-sm text-gray-500 mb-4">Actions here are permanent and cannot be undone.</p>
              <button className="w-full py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition">
                Delete Account
              </button>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Edit Profile Modal (Mock) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" defaultValue="Sarah Johnson" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
