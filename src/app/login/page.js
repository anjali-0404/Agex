'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [tab, setTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg)] text-[var(--text)]">
      {/* Left Panel - Branding & Graphics */}
      <div className="md:w-1/2 bg-gradient-to-br from-[var(--primary)] to-blue-900 p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex text-white">
        <div className="relative z-10 flex items-center gap-2">
          <Shield size={32} className="text-white" />
          <span className="text-2xl font-black tracking-tight">Aegis AI</span>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Your intelligent safety companion.</h1>
          <p className="text-lg opacity-80 border-l-4 border-white/30 pl-4 italic">
            "Aegis AI helps me navigate the city with confidence, day or night."
          </p>
        </div>

        {/* Abstract Glass Elements */}
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 bg-white/5 backdrop-blur-md rotate-12 transform origin-center"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="md:w-1/2 flex-1 flex flex-col justify-center p-6 md:p-12 relative">
        <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
          
          <div className="md:hidden flex items-center gap-2 justify-center mb-8">
            <Shield size={28} className="text-[var(--primary)]" />
            <span className="text-2xl font-black tracking-tight">Aegis AI</span>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
            <p className="text-gray-500">Please enter your details to continue.</p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl relative">
            <button 
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all z-10 ${tab === 'signin' ? 'bg-white dark:bg-gray-700 shadow text-black dark:text-white' : 'text-gray-500'}`}
              onClick={() => setTab('signin')}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all z-10 ${tab === 'signup' ? 'bg-white dark:bg-gray-700 shadow text-black dark:text-white' : 'text-gray-500'}`}
              onClick={() => setTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="sarah@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all pr-12"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {tab === 'signin' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300" />
                  <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-[var(--primary)] font-semibold hover:underline">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>{tab === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
            <span className="relative bg-[var(--bg)] px-4 text-sm text-gray-500">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="glass flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium border border-gray-200 dark:border-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="glass flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium border border-gray-200 dark:border-gray-700">
              <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.31-.83 3.83-.73 1.25.07 2.37.52 3.16 1.48-2.69 1.65-2.24 5.38.38 6.47-.64 1.58-1.54 3.19-2.45 4.95zm-3.32-15.6c-.1-1.63 1.25-3.14 2.87-3.34.25 1.76-1.39 3.17-2.87 3.34z"/></svg>
              Apple
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
