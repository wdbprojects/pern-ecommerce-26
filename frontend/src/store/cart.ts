import { CartItem, CartState } from "@/config/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem(item: CartItem, quantity: number = 1) {
        const items = [...get().items];
        const i = items.findIndex((existingItem) => {
          return existingItem.productId === item.productId;
        });
        if (i >= 0) {
          items[i] = { ...items[i], quantity: items[i].quantity + quantity };
        } else {
          items.push({ ...item, quantity: quantity });
        }
        set({ items });
      },
      removeItem(productId: string) {
        set({
          items: get().items.filter((item: CartItem) => {
            return item.productId !== productId;
          }),
        });
      },
      setQuantity(productId: string, quantity: number) {
        if (quantity <= 0) {
          set({
            items: get().items.map((item) => {
              return item.productId === productId
                ? { ...item, quantity }
                : item;
            }),
          });
        }
      },
      clearCart() {
        set({ items: [] });
      },
    }),
    { name: "ecommerce26" },
  ),
);
