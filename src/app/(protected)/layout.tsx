import styles from './layout.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Questionist",
  description: "Your personal knowledge manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layoutContainer}>
          {children}
        </div>
      </body>
    </html>
  )
}
