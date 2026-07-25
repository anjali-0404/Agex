'use client';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
  const pathname = usePathname();

  // Standalone full-screen pages like login bypass shell navigation
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className={styles.shell}>
      <Sidebar />
      <MobileHeader />
      <main className={styles.main}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
