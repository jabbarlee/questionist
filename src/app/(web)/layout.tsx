import type { Metadata } from "next";
import Navbar from '@/components/ui/Navbar'
import { inter } from '@/data/fonts'

export const metadata: Metadata = {
  title: "Questionist",
  description: "Your personal knowledge manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
