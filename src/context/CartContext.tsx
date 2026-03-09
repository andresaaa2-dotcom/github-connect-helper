import React, { createContext, useContext, useState, type ReactNode } from "react";
import { supplements, calculateBundlePrice } from "@/data/supplements";

export interface CartItem {
  supplementId: string;
  type: "subscription" | "one-time";
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  bundleItems: string[];
  setBundleItems: (ids: string[]) => void;
  addToCart: (supplementId: string, type: "subscription" | "one-time") => void;
  removeFromCart: (supplementId: string) => void;
  updateQuantity: (supplementId: string, quantity: number) => void;
  clearCart: () => void;
  bundlePrice: number;
  cartTotal: number;
  hasBundle: boolean;
  setHasBundle: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [bundleItems, setBundleItems] = useState<string[]>([]);
  const [hasBundle, setHasBundle] = useState(false);

  const bundlePrice = calculateBundlePrice(bundleItems);

  const addToCart = (supplementId: string, type: "subscription" | "one-time") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.supplementId === supplementId);
      if (existing) return prev;
      return [...prev, { supplementId, type, quantity: 1 }];
    });
  };

  const removeFromCart = (supplementId: string) => {
    setItems((prev) => prev.filter((i) => i.supplementId !== supplementId));
  };

  const updateQuantity = (supplementId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(supplementId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.supplementId === supplementId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setItems([]);
    setBundleItems([]);
    setHasBundle(false);
  };

  const cartTotal =
    (hasBundle ? bundlePrice : 0) +
    items.reduce((sum, item) => {
      const supp = supplements.find((s) => s.id === item.supplementId);
      return sum + (supp?.price || 0) * item.quantity;
    }, 0);

  return (
    <CartContext.Provider
      value={{ items, bundleItems, setBundleItems, addToCart, removeFromCart, updateQuantity, clearCart, bundlePrice, cartTotal, hasBundle, setHasBundle }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
