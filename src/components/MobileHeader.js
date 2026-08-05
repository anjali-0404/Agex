'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './MobileHeader.module.css';

const titles = {
  '/':          'Dashboard',
  '/map':       'Safety Map',
  '/routes':    'Route Planner',
  '/report':    'Report Incident',
  '/community': 'Community',
  '/analytics': 'Analytics',
  '/assistant': 'Safety Assistant',
  '/profile':   'Profile & Contacts',
  '/emergency': 'Emergency Hub',
  '/journey':   'Secure Journey',
  '/places':    'Safe Havens',
  '/admin':     'Admin Panel',
  '/settings':  'Settings',
};

export default function MobileHeader() {
  const pathname = usePathname();
  const { user, isAuthenticated, triggerSOS } = useAuth();
  const title = titles[pathname] || 'AegisAI India';

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <div className={styles.logoBadge}>
          <span className="icon" style={{ fontSize: 18, color: '#fff' }}>shield_person</span>
        </div>
        <span className={`${styles.title} grad-text-indigo`}>Aegis Safety</span>
      </Link>
      <div className={styles.pageTitle}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => triggerSOS()}
          style={{
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            border: 'none',
            borderRadius: '20px',
            color: '#fff',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
          <span className="icon" style={{ fontSize: 14 }}>emergency</span> SOS
        </button>

        {isAuthenticated && user ? (
          <Link href="/profile" className={styles.avatarBtn}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
              alt="Profile" className={styles.avatar} />
          </Link>
        ) : (
          <Link href="/login" className="btn-cyan" style={{ padding: '6px 14px', fontSize: 11 }}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

