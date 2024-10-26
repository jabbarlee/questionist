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
      <body className={inter.className} >
        <div className={styles.pageWrapper}>
          <ProtectedNavbar />
          <div className={styles.layoutContainer}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
