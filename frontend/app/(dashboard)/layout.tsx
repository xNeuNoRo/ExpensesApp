import { ReactNode } from "react";
import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="p-4 sm:ml-64">
        {/* Header movil opcional podría ir aqui idk, despues veo */}

        <main className="mx-auto max-w-7xl pt-4">{children}</main>
      </div>
    </div>
  );
}
