'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

const items = [
  { href: '/',          icon: 'dashboard',  label: 'Home' },
  { href: '/map',       icon: 'explore',    label: 'Map' },
  { href: '/emergency', icon: 'emergency',  label: 'SOS',   sos: true },
  { href: '/assistant', icon: 'smart_toy',  label: 'Aegis' },
  { href: '/profile',   icon: 'person',     label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}
            className={`${styles.item} ${active ? styles.active : ''} ${item.sos ? styles.sos : ''}`}>
            <span className="icon" style={{ fontSize: item.sos ? 26 : 22 }}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
