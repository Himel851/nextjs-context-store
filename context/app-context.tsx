"use client";

import type { ReactNode } from "react";
import { UserProvider } from "@/context/user";
import { CartProvider } from "@/context/cart";

/**
 * Composed provider that wraps the entire application.
 * Add new providers here — order matters only if providers depend on each other.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
}
