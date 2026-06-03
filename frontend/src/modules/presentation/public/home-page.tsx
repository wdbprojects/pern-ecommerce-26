"use client";

import { useHomeCatalog } from "@/hooks/use-home-catalog";
import HomeHero from "@/modules/components/home/home-hero";

const HomePage = () => {
  const {
    products,
    categories,
    categoryChipsLoading,
    categoryFilter,
    error,
    loadingCategories,
    loadingProducts,
    setCategory,
  } = useHomeCatalog();

  return (
    <div className="space-y-12 p-4">
      <HomeHero categories={categories} loadingCategories={loadingCategories} />
    </div>
  );
};

export default HomePage;
