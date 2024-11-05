// layout.tsx

import styles from './layout.module.css';
import '../(web)/globals.css';
import type { Metadata } from 'next';
import ProtectedNavbar from '@/components/ui/Navbar/ProtectedNavbar';
import { inter } from '@/data/fonts';

export const metadata: Metadata = {
  title: "Questionist",
  description: "Your personal knowledge manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.pageWrapper}>
          <aside className={styles.sidebar}>
            <ProtectedNavbar /> {/* Fixed sidebar on the left */}
          </aside>
          <main className={styles.contentWrapper}>
            {children} {/* Scrollable main content */}
          </main>
        </div>
      </body>
    </html>
  );
}
