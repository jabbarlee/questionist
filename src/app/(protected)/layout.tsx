export const metadata = {
  title: 'Dashboard',
  description: 'Created by Amil Jabarli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
