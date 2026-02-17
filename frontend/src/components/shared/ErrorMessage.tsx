import type { ReactNode } from "react";

// Componente simple para mostrar mensajes de error de forma consistente en la app
export default function ErrorMessage({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="p-3 text-xs font-bold text-center text-danger uppercase bg-danger/10 border border-danger/20 rounded-lg animate-in fade-in slide-in-from-top-1">
      {children}
    </div>
  );
}
