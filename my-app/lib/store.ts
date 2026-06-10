/* ─────────────────────────────────────────────────────────────
   lib/store.ts
   Zustand stores for cart, wishlist, and UI state.
   All stores are client-only; safe to import in "use client" components.
───────────────────────────────────────────────────────────── */

import { create } from "zustand";
import type { Product } from "@/lib/products";

/* ── Cart ────────────────────────────────────────────────────── */
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  /** Add one unit of a product (increments qty if already in cart). */
  add: (product: Product) => void;
  /** Remove a product entirely from the cart. */
  remove: (id: number) => void;
  /** Set an exact quantity; removes item if qty ≤ 0. */
  setQty: (id: number, qty: number) => void;
  /** Clear the entire cart. */
  clear: () => void;
  /** Total item count (sum of all quantities). */
  count: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  remove: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),

  setQty: (id, qty) =>
    set((state) => {
      if (qty <= 0) return { items: state.items.filter((i) => i.product.id !== id) };
      return {
        items: state.items.map((i) =>
          i.product.id === id ? { ...i, quantity: qty } : i,
        ),
      };
    }),

  clear: () => set({ items: [] }),

  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

/* ── Wishlist ─────────────────────────────────────────────────── */
interface WishlistStore {
  /** Array of wishlisted product IDs. */
  ids: number[];
  /** Toggle a product in/out of the wishlist. */
  toggle: (id: number) => void;
  /** Check whether a product is wishlisted (selector-friendly). */
  has: (id: number) => boolean;
}

export const useWishlist = create<WishlistStore>((set, get) => ({
  ids: [],

  toggle: (id) =>
    set((state) => ({
      ids: state.ids.includes(id)
        ? state.ids.filter((i) => i !== id)
        : [...state.ids, id],
    })),

  has: (id) => get().ids.includes(id),
}));

/* ── UI ───────────────────────────────────────────────────────── */
interface UIStore {
  /** Product ID currently open in Quick View, or null. */
  quickViewId: number | null;
  setQuickView: (id: number | null) => void;
}

export const useUI = create<UIStore>((set) => ({
  quickViewId: null,
  setQuickView: (id) => set({ quickViewId: id }),
}));
