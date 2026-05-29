import { ReactNode } from "react";

export type LayoutPropsMain = {
  children: ReactNode;
};

/* ZUSTAND */
export interface CartItem {
  productId: string;
  name?: string;
  price?: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setQuantity: (productId: string, quantity: number) => void;
  // getTotalPrice: () => void;
}
