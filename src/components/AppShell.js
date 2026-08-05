'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import BottomNav from './BottomNav';
import { useAuth } from '@/context/AuthContext';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
  const { isAuthenticated, authLoading, sosActive, activeSosData, cancelSOS } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = pathname === '/login' || pathname === '/';

  useEffect(() => {
    if (!authLoading && !isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, pathname, isPublicRoute, router]);

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }} />
        <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>Checking session security...</div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated && !isPublicRoute) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <MobileHeader />
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <BottomNav />

      {/* Real-time SOS Active Overlay Modal */}
      {sosActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          background: 'rgba(15, 23, 42, 0.96)',
          backdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          <div style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 50px rgba(239, 68, 68, 0.8)',
            marginBottom: 20,
            animation: 'sosGlowPulse 1.2s infinite'
          }}>
            <span className="icon" style={{ fontSize: 48 }}>emergency</span>
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#f8fafc' }}>🚨 SOS EMERGENCY ACTIVE</h2>
          <p style={{ fontSize: 15, color: '#fca5a5', marginTop: 8, maxWidth: 480 }}>
            Live Emergency Alert Dispatched to Emergency Control (112), Women Helpline (1091), and saved Emergency Contacts!
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: 16,
            padding: 20,
            marginTop: 20,
            width: '100%',
            maxWidth: 440,
            textAlign: 'left',
            fontSize: 13
          }}>
            <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Emergency Dispatch Details</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span>User:</span> <span style={{ color: '#fff', fontWeight: 600 }}>{activeSosData?.userName || 'Ananya Sharma'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span>Phone:</span> <span style={{ color: '#fff', fontWeight: 600 }}>{activeSosData?.userPhone || '+91 98765 43210'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span>Live GPS:</span> <span style={{ color: '#38bdf8', fontWeight: 700 }}>28.6139° N, 77.2090° E</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status:</span> <span style={{ color: '#10b981', fontWeight: 700 }}>Dispatched to 112 Command</span>
            </div>
          </div>

          <button
            onClick={cancelSOS}
            style={{
              marginTop: 28,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#f8fafc',
              padding: '12px 36px',
              borderRadius: 30,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer'
            }}>
            Deactivate & I am Safe
          </button>
        </div>
      )}
    </div>
  );
}
