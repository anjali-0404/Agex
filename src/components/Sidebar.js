'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/dashboard', icon: 'dashboard',          label: 'Dashboard' },
  { href: '/map',       icon: 'explore',            label: 'Safety Map' },
  { href: '/routes',    icon: 'route',              label: 'Route Planner' },
  { href: '/emergency', icon: 'emergency',          label: 'Emergency Hub' },
  { href: '/places',    icon: 'verified_user',      label: 'Safe Havens' },
  { href: '/report',    icon: 'report',             label: 'Report Incident' },
  { href: '/community', icon: 'groups',             label: 'Community' },
  { href: '/analytics', icon: 'analytics',          label: 'Analytics' },
];

const bottomItems = [
  { href: '/assistant', icon: 'smart_toy',          label: 'Safety Assistant' },
  { href: '/profile',   icon: 'person',             label: 'Profile & Contacts' },
  { href: '/settings',  icon: 'settings',           label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, triggerSOS, sharingLocation, startSharingLocation, stopSharingLocation } = useAuth();
  const { location: userLocation } = useRealtimeLocation();

  return (
    <nav className={styles.sidebar}>
      {/* Logo */}
      <Link href="/dashboard" className={styles.logo}>
        <div className={styles.logoBadge}>
          <span className="icon" style={{ fontSize: 22, color: '#fff' }}>shield_person</span>
        </div>
        <div>
          <div className={`${styles.logoText} grad-text-indigo`}>Aegis Safety</div>
          <div className={styles.logoSub}>Personal Protection</div>
        </div>
      </Link>

      {/* Main nav */}
      <div className={styles.nav}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`${styles.navItem} ${active ? styles.active : ''}`}>
              <span className="icon" style={{ fontSize: 22 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Emergency SOS & Share Location Quick Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '14px 0' }}>
        <button
          onClick={() => triggerSOS(userLocation)}
          className="btn-sos"
          style={{ width: '100%', justifyContent: 'center' }}>
          <span className="icon" style={{ fontSize: 20 }}>emergency</span>
          Rapid SOS Alert
        </button>

        <button
          onClick={() => sharingLocation ? stopSharingLocation() : startSharingLocation(userLocation)}
          style={{
            width: '100%',
            background: sharingLocation ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: sharingLocation ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
            color: sharingLocation ? '#38bdf8' : '#cbd5e1',
            padding: '10px 14px',
            borderRadius: '24px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s ease'
          }}>
          <span className="icon" style={{ fontSize: 16 }}>{sharingLocation ? 'location_on' : 'share_location'}</span>
          {sharingLocation ? 'Sharing Live GPS' : 'Share Live Location'}
        </button>
      </div>

      <div className={styles.divider} />

      {/* Bottom items */}
      <div className={styles.bottomNav}>
        {bottomItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`${styles.navItem} ${active ? styles.active : ''}`}>
              <span className="icon" style={{ fontSize: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User avatar / Auth card */}
      {isAuthenticated && user ? (
        <Link href="/profile" className={styles.userArea}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User'} className={styles.avatar} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={styles.userName} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {user?.name || 'Ananya Sharma'}
            </div>
            <div className={styles.userStatus}>
              <span className="pulse-dot pulse-dot-green" style={{ width: 6, height: 6 }} />
              <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>E2EE Verified</span>
            </div>
          </div>
          <span className="icon" style={{ fontSize: 18, color: '#64748b' }}>chevron_right</span>
        </Link>
      ) : (
        <Link href="/login" className="btn-cyan" style={{ marginTop: 16, width: '100%', justifyContent: 'center', fontSize: 13, py: 10 }}>
          <span className="icon">login</span> Sign In to Portal
        </Link>
      )}
    </nav>
  );
}

