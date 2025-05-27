"use client";

import { CurrentUser, UserContext } from "@/lib/context/UserContext";

export default function UserRootProvider({
  user,
  children,
}: {
  user: CurrentUser;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
