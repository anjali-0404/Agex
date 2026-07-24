'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/',          icon: 'dashboard',          label: 'Dashboard' },
  { href: '/map',       icon: 'explore',            label: 'Safety Map' },
  { href: '/routes',    icon: 'route',              label: 'Route Planner' },
  { href: '/report',    icon: 'report',             label: 'Report Incident' },
  { href: '/community', icon: 'groups',             label: 'Community' },
  { href: '/analytics', icon: 'analytics',          label: 'Analytics' },
];

const bottomItems = [
  { href: '/assistant', icon: 'smart_toy',          label: 'Safety Assistant' },
  { href: '/profile',   icon: 'person',             label: 'Profile' },
  { href: '/settings',  icon: 'settings',           label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoBadge}>
          <span className="icon" style={{ fontSize: 22, color: '#fff' }}>shield_person</span>
        </div>
        <div>
          <div className={`${styles.logoText} grad-text-indigo`}>AegisAI</div>
          <div className={styles.logoSub}>Empathetic Futurism</div>
        </div>
      </div>

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

      {/* Emergency SOS */}
      <Link href="/emergency" className={styles.sosBtn}>
        <span className="icon" style={{ fontSize: 20 }}>emergency</span>
        Emergency SOS
      </Link>

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

      {/* User avatar */}
      <div className={styles.userArea}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCDzWbsWn99APYomqRDkbS5k7UncVZ_w03EAuZRonCUwvscGvzAhT0gIUajYiNYib4IYOGGdstdGezp0E1_BC1J3vB9UagdRkFbw1BJxIIv8XV1LvUV0o9THrKzkjPS57dRT5hish5X_QgWA74J_OaSSQuBdH8w-TPKdsemLiU576c9A7yae9DFG56iiEfVljHu8c6svDS86psLGXi307-_x9_fRjq8UbtcDk4IzQEEQ2NEceF5DuYzAGO4-nGOyoGRmiI3BkPgo"
          alt="Sarah" className={styles.avatar} />
        <div>
          <div className={styles.userName}>Sarah Johnson</div>
          <div className={styles.userStatus}>
            <span className="pulse-dot pulse-dot-green" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 11 }}>Protected</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
