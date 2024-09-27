import type { Metadata } from "next";

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
      <body>
        {children}
      </body>
    </html>
  );
}
