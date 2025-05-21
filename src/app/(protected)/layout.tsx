import styles from "./layout.module.css";
import "../(web)/globals.css";
import type { Metadata } from "next";
import VerticalNavbar from "@/components/ui/Navbar/VerticalNavbar";
import { inter } from "@/data/fonts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserProvider } from "@/lib/context/UserContext";
import dynamic from "next/dynamic";
const UserRootProvider = dynamic(
  () => import("@/components/ui/UserRootProvider"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Questionist",
  description: "Your personal knowledge manager",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = cookies().get("session")?.value;
  if (!session) redirect("/signin");

  const uid = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL ?? ""}/api/firebase/get/user`,
    {
      headers: { cookie: `session=${session}` },
      cache: "force-cache",
    }
  )
    .then((r) => (r.ok ? r.json() : redirect("/signin")))
    .then(({ uid }) => uid as string);

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserRootProvider user={{ uid }}>
          <div className={styles.pageWrapper}>
            <aside className={styles.sidebar}>
              <VerticalNavbar />
            </aside>
            <main className={styles.contentWrapper}>{children}</main>
          </div>
        </UserRootProvider>
      </body>
    </html>
  );
}
