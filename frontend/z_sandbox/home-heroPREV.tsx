"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ICategories } from "@/config/types";
import { SparkleIcon } from "lucide-react";

const HomeHero = ({ categories, loadingCategories }: ICategories) => {
  return (
    <section className="rounded-box border-base-300 from-base-100 via-base-100 to-primary/10 relative overflow-hidden border bg-linear-to-br shadow-lg">
      <div
        className="bg-primary/10 absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full blur-3xl"
        aria-hidden
      />

      <div className="relative grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12 lg:p-14">
        <div className="text-left"></div>

        <div className="grid gap-0">
          <Card className="max-w-auto @container/card w-30 gap-1 px-0 py-2">
            <p className="text-base-content/50 m-0 mb-0 p-0 text-center uppercase">
              Categories
            </p>
            <div className="mt-0 flex items-center justify-center p-0 text-center text-2xl font-semibold tabular-nums">
              {loadingCategories ? (
                <Skeleton className="h-8 w-8 rounded-md" />
              ) : (
                <span>{categories?.length}</span>
              )}
            </div>
            <p className="text-muted-foreground text-center text-xs">
              Curated Groups
            </p>
          </Card>

          <div className="border-primary/30 bg-primary/5 rounded-md border border-dashed px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SparkleIcon className="text-primary size-4" />
              Secure checkout - Priority support on paid orders
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
