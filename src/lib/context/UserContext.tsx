"use client";

import { createContext, useContext } from "react";

export type CurrentUser = {
  uid: string;
  name: string;
  email: string;
};

export const UserContext = createContext<CurrentUser | null>(null);
export const UserProvider = UserContext.Provider;

export function useCurrentUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useCurrentUser must be inside <UserProvider>");
  return ctx;
}
