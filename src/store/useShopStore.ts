"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  announcementDismissed: boolean;

  // Ephemeral UI overlays
  cartOpen: boolean;
  wishlistOpen: boolean;
  searchOpen: boolean;
  appointmentOpen: boolean;
  quickViewProduct: Product | null;
  toastMessage: string | null;

  // Actions
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string, productName?: string) => void;
  dismissAnnouncement: () => void;

  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setAppointmentOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      announcementDismissed: false,

      cartOpen: false,
      wishlistOpen: false,
      searchOpen: false,
      appointmentOpen: false,
      quickViewProduct: null,
      toastMessage: null,

      addToCart: (product, size, quantity = 1) => {
        const chosenSize = size ?? product.sizes[0] ?? "Standard";
        const current = get().cart;
        const existingIndex = current.findIndex(
          (item) => item.product.id === product.id && item.size === chosenSize
        );

        let updated: CartItem[];
        if (existingIndex >= 0) {
          updated = current.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updated = [...current, { product, size: chosenSize, quantity }];
        }

        set({ cart: updated, toastMessage: `Added "${product.name}" to your bag` });
      },

      removeFromCart: (productId, size) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        }));
      },

      updateQuantity: (productId, size, delta) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.product.id === productId && item.size === size
                ? { ...item, quantity: item.quantity + delta }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId, productName) => {
        const exists = get().wishlist.includes(productId);
        set((state) => ({
          wishlist: exists
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
          toastMessage: exists
            ? productName
              ? `Removed "${productName}" from wishlist`
              : "Removed from wishlist"
            : productName
              ? `Saved "${productName}" to wishlist`
              : "Saved to wishlist",
        }));
      },

      dismissAnnouncement: () => set({ announcementDismissed: true }),
      setCartOpen: (open) => set({ cartOpen: open }),
      setWishlistOpen: (open) => set({ wishlistOpen: open }),
      setSearchOpen: (open) => set({ searchOpen: open }),
      setAppointmentOpen: (open) => set({ appointmentOpen: open }),
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),
      showToast: (message) => set({ toastMessage: message }),
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: "svj-luxury-ui-v1",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        announcementDismissed: state.announcementDismissed,
      }),
    }
  )
);
