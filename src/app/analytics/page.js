'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Download,
  Calendar,
  ShieldAlert,
  ShieldCheck,
  Users
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, subtitle }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {trendValue}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
    </div>
  </div>
);

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const handleExport = () => {
    alert('Mock Download Triggered: safety_report.pdf');
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Safety Analytics</h1>
            <p className="text-gray-500">Overview of community safety metrics and incidents.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="1y">Last 1 Year</option>
            </select>
            
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Overall Safety Score" 
            value="88" 
            subtitle="/ 100"
            icon={ShieldCheck} 
            trend="up" 
            trendValue="+2%" 
          />
          <StatCard 
            title="Incidents This Week" 
            value="12" 
            icon={ShieldAlert} 
            trend="down" 
            trendValue="-25%" 
          />
          <StatCard 
            title="Safe Journeys" 
            value="147" 
            icon={Calendar} 
            trend="up" 
            trendValue="+14%" 
          />
          <StatCard 
            title="Community Verification" 
            value="94%" 
            icon={Users} 
            trend="up" 
            trendValue="+1%" 
          />
        </div>

        {/* Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Area Safety Breakdown (Mocked Chart) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Area Safety Breakdown</h2>
              <button className="text-gray-400 hover:text-gray-600"><BarChart3 size={20} /></button>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[65, 45, 80, 50, 95, 75, 85].map((val, i) => (
                <div key={i} className="w-full bg-blue-100 rounded-t-md relative group">
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all duration-500" 
                    style={{ height: `${val}%` }}
                  ></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                    {val}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium">
              <span>North</span>
              <span>South</span>
              <span>East</span>
              <span>West</span>
              <span>Downtown</span>
              <span>Suburbs</span>
              <span>Campus</span>
            </div>
          </div>

          {/* Incident Heatmap (Mocked Matrix) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Incident Heatmap (Weekly)</h2>
            <div className="flex flex-col h-64 justify-between">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8">{day}</span>
                  <div className="flex-1 flex gap-1">
                    {Array.from({ length: 12 }).map((_, j) => {
                      // Randomize heatmap colors
                      const intensity = Math.random();
                      const bgColor = intensity > 0.8 ? 'bg-red-500' : intensity > 0.5 ? 'bg-orange-300' : 'bg-green-100';
                      return (
                        <div key={j} className={`h-6 flex-1 rounded-sm ${bgColor} hover:opacity-75 cursor-pointer transition-opacity`}></div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between ml-10 mt-2 text-xs text-gray-400">
              <span>12am</span>
              <span>6am</span>
              <span>12pm</span>
              <span>6pm</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
