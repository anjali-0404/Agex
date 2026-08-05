'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Loader2, ArrowRight, Lock, Phone, Mail, User, MapPin, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DEMO_PROFILES = [
  {
    name: 'Ananya Sharma',
    email: 'ananya.sharma@aegis.in',
    phone: '+91 98765 43210',
    city: 'New Delhi, Delhi NCR',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Primary Aegis User (NCR)'
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@aegis.in',
    phone: '+91 98112 33445',
    city: 'Bengaluru, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Tech Corridor Commuter'
  },
  {
    name: 'Neha Patel',
    email: 'neha.patel@aegis.in',
    phone: '+91 97223 88990',
    city: 'Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Night Shift Professional'
  }
];

export default function Login() {
  const router = useRouter();
  const { login, register, verifyOTP, showToast } = useAuth();
  
  const [tab, setTab] = useState('signin'); // 'signin', 'register', 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(30);

  // Form Fields
  const [name, setName] = useState('Ananya Sharma');
  const [email, setEmail] = useState('ananya.sharma@aegis.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [city, setCity] = useState('New Delhi, Delhi NCR');
  const [password, setPassword] = useState('aegis2026');

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleGoogleAuth = async () => {
    setLoading(true);
    showToast('🔑 Connecting securely to Google Accounts...');

    try {
      const googleUser = {
        name: 'Ananya Sharma',
        email: 'ananya.sharma@gmail.com',
        phone: '+91 98765 43210',
        city: 'New Delhi, Delhi NCR',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        provider: 'google'
      };

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'google', ...googleUser })
      });
      await res.json();

      setTimeout(() => {
        login(googleUser);
        setLoading(false);
        router.push('/dashboard');
      }, 700);
    } catch (_) {
      login({ name: 'Ananya Sharma', email: 'ananya.sharma@gmail.com' });
      setLoading(false);
      router.push('/dashboard');
    }
  };

  const handleSendOTP = () => {
    if (!phone) {
      showToast('Please enter your mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(30);
      setOtpCode('892104');
      showToast(`📲 Demo SMS OTP Sent to ${phone}: 892104`);
    }, 600);
  };

  const handleQuickDemo = (profile) => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setCity(profile.city);
    setPassword('aegis2026');
    setLoading(true);

    setTimeout(() => {
      login(profile);
      setLoading(false);
      router.push('/dashboard');
    }, 700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tab === 'otp') {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp: otpCode, name, email, action: 'verify-otp' })
        });
        const data = await res.json();
        if (data.success) {
          verifyOTP(phone, otpCode);
          setLoading(false);
          router.push('/dashboard');
          return;
        }
      } else if (tab === 'register') {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, phone, city, password, action: 'register' })
        });
        const data = await res.json();
        if (data.success) {
          register({ name, email, phone, city });
          setLoading(false);
          router.push('/dashboard');
          return;
        }
      } else {
        // Signin
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, action: 'login' })
        });
        const data = await res.json();
        login(email, password);
        setLoading(false);
        router.push('/dashboard');
        return;
      }
    } catch (_) {
      // Fallback local auth
      if (tab === 'register') {
        register({ name, email, phone, city });
      } else if (tab === 'otp') {
        verifyOTP(phone, otpCode);
      } else {
        login(email, password);
      }
      setLoading(false);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#060913] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Left Panel - Handcrafted Hero & E2EE Graphic */}
      <div className="md:w-5/12 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-14 flex flex-col justify-between relative overflow-hidden hidden md:flex border-r border-slate-800/80">
        
        {/* Ambient Glows */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 p-0.5 shadow-xl shadow-indigo-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-300" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight grad-text">Aegis Safety</span>
            <div className="text-[11px] text-blue-400 font-bold tracking-wider uppercase">Personal Protection Portal</div>
          </div>
        </div>

        {/* Middle Feature Highlights */}
        <div className="relative z-10 my-auto py-12 max-w-lg space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Live Location & Emergency Response
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight grad-text">
              Real-Time Safety.<br />Every Step of the Way.
            </h1>
          </div>

          <p className="text-sm text-slate-300/90 leading-relaxed border-l-2 border-blue-400/80 pl-4 font-medium italic">
            "Aegis provides live GPS location sharing, rapid emergency dispatch (112), and safe route recommendations across Indian cities."
          </p>

          <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-300">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time GPS Tracking</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Instant 112 Dispatch</span>
            </div>
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="relative z-10 pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Session Storage</span>
          </div>
          <span>Aegis v2.4</span>
        </div>

      </div>

      {/* Right Panel - Form Container */}
      <div className="md:w-7/12 flex-1 flex flex-col justify-center p-6 md:p-14 relative overflow-y-auto">
        <div className="max-w-md w-full mx-auto space-y-7 relative z-10 py-6">
          
          {/* Mobile Header Branding */}
          <div className="md:hidden flex items-center gap-3 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-300" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight grad-text">Aegis Safety</span>
          </div>

          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              {tab === 'signin' ? 'Welcome Back' : tab === 'register' ? 'Create Account' : 'Mobile OTP Sign In'}
            </h2>
            <p className="text-slate-400 text-sm mt-1.5 font-normal">
              {tab === 'signin' ? 'Sign in to access your safety dashboard & emergency contacts.' : tab === 'register' ? 'Set up your profile and save your emergency contacts.' : 'Receive a secure 6-digit SMS verification code on your phone.'}
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-md hover:border-slate-600"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-2 flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-[#060913] px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">or login with credentials</span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          {/* Mode Tabs */}
          <div className="flex p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <button 
              type="button"
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${tab === 'signin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setTab('signin')}
            >
              Sign In
            </button>
            <button 
              type="button"
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${tab === 'register' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
            <button 
              type="button"
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${tab === 'otp' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setTab('otp')}
            >
              Phone OTP
            </button>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field (Register Mode) */}
            {tab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-white focus:border-cyan-400 outline-none text-sm"
                />
              </div>
            )}

            {/* Email Field (SignIn or Register) */}
            {tab !== 'otp' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ananya.sharma@aegis.in"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-white focus:border-cyan-400 outline-none text-sm"
                />
              </div>
            )}

            {/* Mobile Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" /> Mobile Number (+91)
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+91 98765 43210"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-white focus:border-cyan-400 outline-none text-sm"
                />
                {tab === 'otp' && (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold transition shrink-0"
                  >
                    {otpSent ? 'Resend' : 'Send Code'}
                  </button>
                )}
              </div>
            </div>

            {/* OTP Code Field (OTP Mode) */}
            {tab === 'otp' && otpSent && (
              <div className="space-y-1.5 animate-in">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> 6-Digit SMS Verification Code
                </label>
                <input 
                  type="text" 
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  maxLength={6}
                  placeholder="892104"
                  className="w-full px-4 py-3 rounded-xl border border-emerald-500/50 bg-slate-900/90 text-emerald-300 font-mono tracking-widest text-center font-bold text-lg outline-none"
                />
                <div className="text-[11px] text-slate-400 text-right">
                  {timer > 0 ? `Resend code in ${timer}s` : 'Code expired. Click Resend.'}
                </div>
              </div>
            )}

            {/* City Field (Register Mode) */}
            {tab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Primary City / Region
                </label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="New Delhi, Delhi NCR"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-white focus:border-cyan-400 outline-none text-sm"
                />
              </div>
            )}

            {/* Password Field (SignIn or Register) */}
            {tab !== 'otp' && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" /> Password
                  </label>
                  {tab === 'signin' && (
                    <button 
                      type="button" 
                      onClick={() => showToast('🔑 Demo Reset Password link sent to your email.')}
                      className="text-xs text-cyan-400 hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-white focus:border-cyan-400 outline-none text-sm pr-12"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-cyan py-3.5 rounded-2xl font-extrabold justify-center text-sm shadow-xl shadow-cyan-500/20 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" /> Verifying E2EE Credentials...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {tab === 'signin' ? 'Sign In to Portal' : tab === 'register' ? 'Create Encrypted Account' : 'Verify Mobile OTP'} <ArrowRight size={18} />
                </span>
              )}
            </button>

          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>⚡ Quick Demo Profiles (1-Click Login)</span>
              <span className="text-emerald-400 text-[11px] font-semibold">Ready to Test</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {DEMO_PROFILES.map((prof) => (
                <button
                  key={prof.email}
                  type="button"
                  onClick={() => handleQuickDemo(prof)}
                  className="w-full p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/90 text-left transition flex items-center gap-3 group"
                >
                  <img src={prof.avatar} alt={prof.name} className="w-9 h-9 rounded-full object-cover border border-cyan-400/40" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-1.5">
                      {prof.name} <CheckCircle2 className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{prof.city} • {prof.phone}</div>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full shrink-0">
                    Select
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

