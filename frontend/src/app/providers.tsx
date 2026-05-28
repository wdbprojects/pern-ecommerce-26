"use client";

import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LayoutPropsMain } from "@/config/types";
import NextTopLoader from "nextjs-toploader";

const Providers = ({ children }: LayoutPropsMain) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <div>
        <NextTopLoader showSpinner={false} color="#3b82f6" />
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors closeButton position="bottom-right" expand={true} />
      </div>
    </ThemeProvider>
  );
};
export default Providers;
