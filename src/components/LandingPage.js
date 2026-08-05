'use client';
import Link from 'next/link';
import { 
  Shield, Navigation, Phone, MapPin, 
  Users, Building2, CheckCircle2, ArrowRight, 
  Lock, Sparkles, AlertOctagon, HeartHandshake
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      
      {/* Top Header / Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)' }}>
              <Shield size={22} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>Aegis Safety</div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Personal Protection Companion</div>
            </div>
          </Link>

          <div style={{ display: 'none', alignItems: 'center', gap: 24, fontSize: 14, fontWeight: 600, color: '#cbd5e1' }} className="hidden md:flex">
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Features</a>
            <a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none' }}>How It Works</a>
            <a href="#cities" style={{ color: 'inherit', textDecoration: 'none' }}>Supported Cities</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isAuthenticated ? (
              <Link href="/dashboard" style={{ padding: '10px 22px', borderRadius: 24, fontSize: 13, fontWeight: 800, border: 'none', color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}>
                Open App Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/login" style={{ padding: '9px 18px', borderRadius: 24, fontSize: 13, fontWeight: 700, border: '1px solid rgba(255,255,255,0.15)', color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.05)' }}>
                  Sign In
                </Link>
                <Link href="/login?tab=register" style={{ padding: '9px 22px', borderRadius: 24, fontSize: 13, fontWeight: 700, border: 'none', color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}>
                  Get Started Free →
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            <Shield size={15} /> Real-Time Personal Protection & Live GPS Tracking
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 900, margin: '0 auto 20px' }}>
            Travel with Confidence.<br />
            <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Stay Safe Everywhere You Go.
            </span>
          </h1>

          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 680, lineHeight: 1.6, margin: '0 auto 36px', fontWeight: 500 }}>
            Aegis combines live GPS tracking, 1-tap 112 emergency police dispatch, safe corridor route recommendations, and 24/7 verified safe havens across Indian cities.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 60 }}>
            <Link href="/login?tab=register" style={{ padding: '16px 36px', borderRadius: 30, fontSize: 16, fontWeight: 800, color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', boxShadow: '0 8px 30px rgba(59, 130, 246, 0.45)', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span>Get Started Free</span> <ArrowRight size={18} />
            </Link>
            <Link href="/login" style={{ padding: '16px 32px', borderRadius: 30, fontSize: 16, fontWeight: 700, color: '#f8fafc', textDecoration: 'none', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              Sign In to Portal
            </Link>
          </div>

          {/* Hero Feature Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, width: '100%', maxWidth: 1050, marginTop: 20 }}>
            
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 20, padding: 24, textAlign: 'left', backdropFilter: 'blur(20px)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <AlertOctagon size={24} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: '#fff' }}>1-Tap Rapid SOS</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                Instantly dispatches live GPS location to Delhi Police (112), Women Helpline (1091), and saved emergency contacts.
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 20, padding: 24, textAlign: 'left', backdropFilter: 'blur(20px)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Navigation size={24} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Safe Route Planner</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                Recommends well-lit, CCTV-monitored walking and driving routes with safety scores for day & night travel.
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 20, padding: 24, textAlign: 'left', backdropFilter: 'blur(20px)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: '#fff' }}>24/7 Verified Safe Havens</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                Locate nearby 24/7 police precincts, metro stations with CISF security, hospitals, and illuminated retail havens.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Feature Deep Dive Section */}
      <section id="features" style={{ padding: '80px 24px', background: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>Designed for Complete Peace of Mind</h2>
            <p style={{ fontSize: 15, color: '#94a3b8', marginTop: 8, maxWidth: 600, margin: '8px auto 0' }}>
              Comprehensive safety tools built specifically for urban commuters, students, and night travelers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Live GPS Location Sharing</h3>
              </div>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
                Share your live trip link with family members or trusted guardians. They can track your movement in real time until you arrive safely.
              </p>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Community Safety Watch</h3>
              </div>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
                Stay informed with crowdsourced warnings from local residents about dark alleys, road blockages, or streetlight outages across Indian cities.
              </p>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartHandshake size={20} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Emergency Siren & Fake Call</h3>
              </div>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
                Built-in Web Audio loud siren to deter threats and a realistic incoming call screen to help you exit uncomfortable situations safely.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 12 }}>3 Simple Steps to Stay Protected</h2>
          <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: 50 }}>Start using Aegis in under 60 seconds.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 28, borderRadius: 20, textTransform: 'left' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#3b82f6', marginBottom: 12 }}>01</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Sign Up & Create Profile</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                Sign in quickly using Google or create an account with your mobile number.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 28, borderRadius: 20, textTransform: 'left' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#a855f7', marginBottom: 12 }}>02</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Add Emergency Contacts</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                Save parents, friends, or trusted guardians to receive automatic live location SOS alerts.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 28, borderRadius: 20, textTransform: 'left' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#10b981', marginBottom: 12 }}>03</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Travel Safely Anywhere</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                Check route safety scores, share live GPS trips, or trigger SOS whenever needed.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Cities Supported Banner */}
      <section id="cities" style={{ padding: '50px 24px', background: 'rgba(59, 130, 246, 0.08)', borderTop: '1px solid rgba(59, 130, 246, 0.2)', borderBottom: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            📍 Active Safety Coverage Across Major Cities
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {['New Delhi & NCR', 'Gurugram', 'Noida', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'].map((city, idx) => (
              <span key={idx} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.12)', padding: 48, borderRadius: 32, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Your Personal Safety Starts Today</h2>
          <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            Join thousands of users across India who rely on Aegis for live location tracking and emergency response.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/login?tab=register" style={{ padding: '14px 32px', borderRadius: 26, fontSize: 15, fontWeight: 800, color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}>
              Create Free Account
            </Link>
            <Link href="/login" style={{ padding: '14px 28px', borderRadius: 26, fontSize: 15, fontWeight: 700, color: '#cbd5e1', textDecoration: 'none', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px 24px', textAlign: 'center', fontSize: 13, color: '#64748b' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ fontWeight: 800, color: '#94a3b8' }}>Aegis Personal Safety Companion</div>
          <div>© 2026 Aegis Safety India. All rights reserved. Encrypted & Secure.</div>
        </div>
      </footer>

    </div>
  );
}
