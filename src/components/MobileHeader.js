'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MobileHeader.module.css';

const titles = {
  '/':          'Dashboard',
  '/map':       'Safety Map',
  '/routes':    'Route Planner',
  '/report':    'Report Incident',
  '/community': 'Community',
  '/analytics': 'Analytics',
  '/assistant': 'Safety Assistant',
  '/profile':   'Profile',
  '/emergency': 'Emergency SOS',
  '/journey':   'Secure Journey',
  '/places':    'Safe Places',
  '/admin':     'Admin Panel',
  '/settings':  'Settings',
};

export default function MobileHeader() {
  const pathname = usePathname();
  const title = titles[pathname] || 'AegisAI';

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoBadge}>
          <span className="icon" style={{ fontSize: 18, color: '#fff' }}>shield_person</span>
        </div>
        <span className={`${styles.title} grad-text-indigo`}>AegisAI</span>
      </div>
      <div className={styles.pageTitle}>{title}</div>
      <Link href="/profile" className={styles.avatarBtn}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCDzWbsWn99APYomqRDkbS5k7UncVZ_w03EAuZRonCUwvscGvzAhT0gIUajYiNYib4IYOGGdstdGezp0E1_BC1J3vB9UagdRkFbw1BJxIIv8XV1LvUV0o9THrKzkjPS57dRT5hish5X_QgWA74J_OaSSQuBdH8w-TPKdsemLiU576c9A7yae9DFG56iiEfVljHu8c6svDS86psLGXi307-_x9_fRjq8UbtcDk4IzQEEQ2NEceF5DuYzAGO4-nGOyoGRmiI3BkPgo"
          alt="Profile" className={styles.avatar} />
      </Link>
    </header>
  );
}
