"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/shared/Sidebar";
import { useUi } from "@/hooks/store/useUi";
import { IoMenu } from "react-icons/io5";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Extraemos la acción de abrir el sidebar desde el hook wrapper.
  const { openSidebar } = useUi();

  return (
    <div className="min-h-screen bg-surface">
      {/* Header móvil consume la acción de abrir el sidebar */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={openSidebar}
            className="rounded-lg p-2 text-muted hover:bg-surface hover:text-primary"
          >
            <IoMenu className="h-6 w-6" />
          </button>
          <span className="font-bold text-primary">ExpensesApp</span>
        </div>
      </header>

      <Sidebar />

      <div className="p-4 sm:ml-64">
        <main className="mx-auto max-w-7xl pt-4">{children}</main>
      </div>
    </div>
  );
}
