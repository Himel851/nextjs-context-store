"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User, UserContextType, UserState } from "@/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(initialState);

  const login = useCallback((user: User) => {
    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    setState(initialState);
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const value = useMemo<UserContextType>(
    () => ({ ...state, login, logout, setLoading }),
    [state, login, logout, setLoading],
  );

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
