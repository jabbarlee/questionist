'use client';

import { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  uid: string | null;
}

const UserContext = createContext<UserContextType>({ uid: null });

export function useUser() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: ReactNode;
  uid: string | null;
}

export function UserProvider({ children, uid }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ uid }}>
      {children}
    </UserContext.Provider>
  );
}
