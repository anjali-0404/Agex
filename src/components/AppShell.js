import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
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
