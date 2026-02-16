"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHome, IoWallet, IoPieChart, IoCodeSlash } from "react-icons/io5";

const navItems = [
  { name: "Dashboard", href: "/", icon: IoHome },
  { name: "Mis Gastos", href: "/expenses", icon: IoWallet },
  { name: "Reportes", href: "/reports", icon: IoPieChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background transition-transform">
      <div className="flex h-full flex-col px-3 py-4">
        {/* Logo */}
        <div className="mb-10 flex items-center pl-2.5">
          <span className="self-center whitespace-nowrap text-2xl font-bold text-primary">
            ExpensesApp
          </span>
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
  );
}
