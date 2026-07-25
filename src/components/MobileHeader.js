'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PAGE_TITLES, DEFAULT_USER } from '@/lib/constants';
import styles from './MobileHeader.module.css';

export default function MobileHeader() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || 'AegisAI';

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoBadge}>
          <span className="icon" style={{ fontSize: 18, color: '#fff' }}>shield_person</span>
        </div>
        <span className={`${styles.title} grad-text-indigo`}>AegisAI</span>
      </div>
      <div className={styles.pageTitle}>{title}</div>
      <Link href="/profile" className={styles.avatarBtn} aria-label="Profile">
        <img
          src={DEFAULT_USER.avatar}
          alt={DEFAULT_USER.name} className={styles.avatar} />
      </Link>
    </header>
  );
}
