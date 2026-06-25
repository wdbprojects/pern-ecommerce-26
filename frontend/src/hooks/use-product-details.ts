"use client";

import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useProductDetails = (slug: string) => {
  const {
    data: productDetails,
    isLoading: loadingProductDetails,
    error: productDetailsError,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => apiFetch(`/api/products/${slug}`, { method: "GET" }),
    enabled: Boolean(slug),
  });

  return {
    product: productDetails?.product ?? null,
    loadingProductDetails: loadingProductDetails,
    productDetailsError: productDetailsError,
  };
};
