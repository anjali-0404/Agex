'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOTTOM_NAV_ITEMS } from '@/lib/constants';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav} aria-label="Mobile Navigation">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}
            aria-label={item.label}
            className={`${styles.item} ${active ? styles.active : ''} ${item.sos ? styles.sos : ''}`}>
            <span className="icon" style={{ fontSize: item.sos ? 26 : 22 }}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
