import styles from "./layout.module.css";
import {inter} from "@/data/fonts";
import '../(web)/globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <div className={styles.pageWrapper}>
            <main className={styles.contentWrapper}>
              {children}
            </main>
          </div>
        </body>
      </html>
  )
}
