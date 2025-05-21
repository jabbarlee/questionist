"use client";
import { UserContext } from "@/lib/context/UserContext";

export default function UserRootProvider({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
