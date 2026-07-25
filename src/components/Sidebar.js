'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, OTHER_NAV_ITEMS, DEFAULT_USER } from '@/lib/constants';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar} aria-label="Main Navigation">
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
        {NAV_ITEMS.map((item) => {
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
      <Link href="/emergency" className={styles.sosBtn} aria-label="Emergency SOS">
        <span className="icon" style={{ fontSize: 20 }}>emergency</span>
        Emergency SOS
      </Link>

      <div className={styles.divider} />

      {/* Bottom items */}
      <div className={styles.bottomNav}>
        {OTHER_NAV_ITEMS.map((item) => {
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
          src={DEFAULT_USER.avatar}
          alt={DEFAULT_USER.name} className={styles.avatar} />
        <div>
          <div className={styles.userName}>{DEFAULT_USER.name}</div>
          <div className={styles.userStatus}>
            <span className="pulse-dot pulse-dot-green" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 11 }}>{DEFAULT_USER.status}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
