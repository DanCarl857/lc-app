"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";

interface Properties {
  children: ReactNode;
}

export function DocumentProviders({ children }: Properties) {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider attribute="class" forcedTheme="light" themes={["light"]}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
