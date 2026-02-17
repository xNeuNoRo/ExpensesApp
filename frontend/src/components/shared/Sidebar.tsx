"use client";

import classNames from "@/helpers/classNames";
import { useUi } from "@/hooks/store/useUi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoHome,
  IoWallet,
  IoPieChart,
  IoCodeSlash,
  IoClose,
  IoGrid,
} from "react-icons/io5";

const navItems = [
  { name: "Dashboard", href: "/", icon: IoHome },
  { name: "Mis Gastos", href: "/expenses", icon: IoWallet },
  { name: "Categorías", href: "/categories", icon: IoGrid },
  { name: "Reportes", href: "/reports", icon: IoPieChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Extraemos el estado del sidebar desde el hook wrapper
  const { isSidebarOpen, closeSidebar } = useUi();

  return (
    <>
      {/* Capa de fondo semitransparente para el sidebar en móvil */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity sm:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />
      <aside
        className={classNames(
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background transition-transform duration-300 ease-in-out sm:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col px-3 py-8">
          {/* Header del Sidebar */}
          <div className="mb-10 flex items-center justify-between pl-2.5">
            <span className="self-center whitespace-nowrap text-2xl font-bold text-primary">
              Expenses App
            </span>
            <button
              onClick={closeSidebar}
              className="rounded-lg p-2 text-muted hover:bg-surface sm:hidden"
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>

          {/* Navegación Principal */}
          <ul className="space-y-2 font-medium flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group flex items-center rounded-lg p-3 transition-colors ${
                      isActive
                        ? "bg-surface text-primary" // Activo: Fondo suave + Color Primario
                        : "text-muted hover:bg-surface hover:text-main" // Inactivo: Texto apagado -> Texto principal al hover
                    }`}
                  >
                    <item.icon
                      className={`h-6 w-6 shrink-0 transition duration-75 ${
                        isActive
                          ? "text-primary"
                          : "text-muted group-hover:text-main"
                      }`}
                    />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer Sidebar */}
          <div className="border-t border-border pt-4 mt-auto">
            <a
              href="https://github.com/xNeunoro"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-surface"
            >
              {/* Icono del footer */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <IoCodeSlash className="h-5 w-5" />
              </div>

              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  Developed by
                </span>
                <span className="truncate text-sm font-semibold text-main">
                  Angel Gonzalez
                </span>
              </div>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
