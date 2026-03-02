"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import type { AppContextType, AppState } from "@/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    message: "Hello from global context!",
  });

  const setMessage = (message: string) => {
    setState({ message });
  };

  useEffect(() => {
    console.log("[AppContext] state changed:", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, setMessage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
