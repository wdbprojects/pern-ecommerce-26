"use client";

import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useHomeCatalog = () => {
  const searchParams = useSearchParams();
  const searchData = searchParams.get("category");
  const categoryFilter = searchData?.trim() ?? "";

  const router = useRouter();
  const pathname = usePathname();

  const setCategory = (category: string) => {
    const next = new URLSearchParams(searchParams?.toString());
    if (!category) {
      next.delete("category");
    } else {
      next.set("category", category);
    }
    router.replace(`${pathname}?${next.toString()}`);
  };

  const { data: categoriesData, isLoading: loadingCategories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => {
      return apiFetch("/api/products/categories", {});
    },
  });

  const {
    data: productsData,
    isLoading: loadingProducts,
    error,
  } = useQuery({
    queryKey: ["products", categoryFilter],
    queryFn: () => {
      return apiFetch(
        categoryFilter
          ? `/api/products?category=${encodeURIComponent(categoryFilter)}`
          : "/api/products",
        { method: "GET" },
      );
    },
  });
  const categories = categoriesData?.categories ?? [];
  const products = productsData?.products ?? [];
  const categoryChipsLoading = loadingCategories && categories.length === 0;

  return {
    categoryFilter: categoryFilter,
    setCategory: setCategory,
    categories: categories,
    products: products,
    categoryChipsLoading: categoryChipsLoading,
    loadingCategories: loadingCategories,
    loadingProducts: loadingProducts,
    error: error,
  };
};
