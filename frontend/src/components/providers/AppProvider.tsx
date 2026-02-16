"use client";

import { ReactNode } from "react";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: Readonly<AppProviderProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer
          pauseOnHover={true}
          pauseOnFocusLoss={false}
          theme="dark"
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
