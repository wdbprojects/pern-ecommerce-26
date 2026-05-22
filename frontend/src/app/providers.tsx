"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { LayoutPropsMain } from "@/config/types";
import NextTopLoader from "nextjs-toploader";

const Providers = ({ children }: LayoutPropsMain) => {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <div>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader showSpinner={false} color="#3b82f6" />
          {children}
          <Toaster
            richColors
            closeButton
            position="bottom-right"
            expand={true}
          />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
};
export default Providers;
