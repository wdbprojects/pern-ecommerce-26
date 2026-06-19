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
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setQuantity: (productId: string, quantity: number) => void;
  // getTotalPrice: () => void;
}

export interface ICategories {
  categories: string | string[] | null;
  loadingCategories: boolean;
}

export interface IProducts {
  active: boolean;
  category: string;
  createdAt: string;
  currency: string;
  description: string;
  id: string;
  imageKitFileId: string | null;
  imageUrl: string;
  name: string;
  priceCents: number;
  slug: string;
}

export type TBody = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

export interface ICartItem {
  productId: string;
  quantity: number;
}
export interface ICartLine {
  line: {
    productId: string;
    quantity: number;
  };
  product: IProducts | null;
}
export interface ICartItemProps {
  lines: ICartLine[];
  setQty: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  subtotal: number;
  checkout: () => void;
  checkoutLoading: boolean;
}
