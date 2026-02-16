import { ReactNode } from "react";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: Readonly<AppProviderProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer pauseOnHover={true} pauseOnFocusLoss={false} />
    </QueryClientProvider>
  );
}
