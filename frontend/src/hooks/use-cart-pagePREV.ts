"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import {
  CartState,
  ICartItem,
  ICartLine,
  IProducts,
  TBody,
} from "@/config/types";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export const useCartPage = () => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const router = useRouter();

  const items = useCart((state: CartState) => {
    return state.items;
  });
  const setQuantity = useCart((state: CartState) => {
    return state.setQuantity;
  });
  const removeItem = useCart((state: CartState) => {
    return state.removeItem;
  });

  const {
    data: data,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return apiFetch("/api/products", { method: "POST" });
    },
    enabled: items.length > 0,
  });
  const products = data?.products ?? [];

  const byId = new Map(
    products.map((product: any) => {
      return [product.id, product];
    }),
  );
  const lines = items.map((line) => {
    return { line: line, product: byId.get(line.productId) ?? null };
  });
  const subtotal = lines.reduce((sum, { line, product: prod }) => {
    if (!prod) return sum;
    return sum + (prod as IProducts)?.priceCents * line.quantity;
  }, 0);

  const checkout = async () => {
    setCheckoutLoading(true);
    const body: TBody = {
      items: items.map((item: { productId: string; quantity: number }) => {
        return { productId: item.productId, quantity: item.quantity };
      }),
    };
    const response = await apiFetch("/api/checkout", {
      method: "POST",
      body: body,
    });
    if (response?.checkoutUrl) {
      router.push(response.checkoutUrl);
      return;
    }
    setCheckoutLoading(false);
  };
  return {
    items: items,
    setQuantity: setQuantity,
    removeItem: removeItem,
    productsLoading: productsLoading,
    productsError: productsError,
    lines: lines,
    subtotal: subtotal,
    checkout: checkout,
    checkoutLoading: checkoutLoading,
    products: products,
  };
};
