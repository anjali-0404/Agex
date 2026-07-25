'use client';

import React, { useState } from 'react';
import { 
  Activity, Users, ShieldAlert, Radio, 
  Search, Filter, CheckCircle, XCircle, 
  AlertOctagon, MoreVertical
} from 'lucide-react';

export default function AdminPage() {
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  const activeIncidents = [
    { id: 'INC-902', type: 'Suspicious Activity', location: 'Downtown Metro Station', reporter: 'User_442', status: 'pending', time: '10 mins ago' },
    { id: 'INC-901', type: 'Harassment', location: 'University Campus', reporter: 'User_891', status: 'verified', time: '1 hour ago' },
    { id: 'INC-899', type: 'Street Light Outage', location: 'Oak St. & 5th Ave', reporter: 'User_112', status: 'pending', time: '2 hours ago' },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
            <p className="text-gray-500">System health and moderation dashboard.</p>
          </div>
          
          <button 
            onClick={() => setIsBroadcastModalOpen(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Radio size={18} />
            Broadcast Alert
          </button>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Activity size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">System Status</p>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Operational <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <h3 className="text-xl font-bold text-gray-900">12,450</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><ShieldAlert size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">Active SOS Alerts</p>
              <h3 className="text-xl font-bold text-gray-900">2</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Incidents */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Active Incidents Moderation</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm">
                    <th className="p-4 font-medium">Incident ID</th>
                    <th className="p-4 font-medium">Type & Location</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeIncidents.map((incident) => (
                    <tr key={incident.id} className="hover:bg-gray-50">
                      <td className="p-4 text-sm font-medium text-gray-900">{incident.id}</td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-gray-900">{incident.type}</p>
                        <p className="text-xs text-gray-500">{incident.location} • {incident.time}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          incident.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {incident.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button title="Approve" className="p-1 text-green-600 hover:bg-green-50 rounded"><CheckCircle size={18} /></button>
                          <button title="Dismiss" className="p-1 text-gray-400 hover:bg-gray-100 rounded"><XCircle size={18} /></button>
                          <button title="Elevate" className="p-1 text-red-600 hover:bg-red-50 rounded"><AlertOctagon size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Management Quick View */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search users..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">User_{Math.floor(Math.random() * 1000)}</p>
                      <p className="text-xs text-gray-500">Standard</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">View All Users</button>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-red-600 p-4 flex justify-between items-center text-white">
              <h2 className="text-lg font-bold flex items-center gap-2"><Radio size={20} /> Broadcast Emergency Alert</h2>
              <button onClick={() => setIsBroadcastModalOpen(false)} className="hover:bg-red-700 p-1 rounded"><XCircle size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Area</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
                  <option>All Active Users</option>
                  <option>Downtown District</option>
                  <option>University Campus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Message</label>
                <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Enter emergency broadcast details..."></textarea>
              </div>
              <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex gap-3 text-red-800 text-sm">
                <AlertOctagon className="flex-shrink-0" size={20} />
                <p>This will send an immediate push notification overriding silent mode for all users in the selected area.</p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsBroadcastModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg">Send Broadcast</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
