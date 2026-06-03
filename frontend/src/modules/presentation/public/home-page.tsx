"use client";

import { useHomeCatalog } from "@/hooks/use-home-catalog";
import HomeHero from "@/modules/components/home/home-hero";
import TestReactQuery from "@/modules/components/home/test-react-query";
import { getCategories } from "@/server/categories";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const {
    //   products,
    categories,
    categoryChipsLoading,
    categoryFilter,
    error,
    loadingCategories,
    loadingProducts,
    setCategory,
  } = useHomeCatalog();

  // const { data, isLoading: loadingCategories } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getCategories,
  // });

  return (
    <div className="space-y-12 p-4">
      {/* <HomeHero categories={categories} loadingCategories={loadingCategories} /> */}
      <HomeHero categories={categories} loadingCategories={loadingCategories} />
      {/* <TestReactQuery /> */}
    </div>
  );
};

export default HomePage;
