"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartContextType, CartItem, CartState } from "@/types";

// ── Reducer actions ──────────────────────────────────────────────────
type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

// ── Helpers ──────────────────────────────────────────────────────────
function computeTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

// ── Reducer ──────────────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { items, ...computeTotals(items) };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload.id);
      return { items, ...computeTotals(items) };
    }
    case "UPDATE_QUANTITY": {
      const items =
        action.payload.quantity <= 0
          ? state.items.filter((i) => i.id !== action.payload.id)
          : state.items.map((i) =>
              i.id === action.payload.id
                ? { ...i, quantity: action.payload.quantity }
                : i,
            );
      return { items, ...computeTotals(items) };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

// ── Initial state ────────────────────────────────────────────────────
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// ── Context + Provider ───────────────────────────────────────────────
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const value = useMemo<CartContextType>(
    () => ({ ...state, addItem, removeItem, updateQuantity, clearCart }),
    [state, addItem, removeItem, updateQuantity, clearCart],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
