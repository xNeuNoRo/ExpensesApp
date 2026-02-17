"use client";

import { useEffect } from "react";
import { IoAlertCircle } from "react-icons/io5";

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Logueamos el error para facilitar la depuración
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4">
      <div className="rounded-full bg-danger/10 p-4 text-danger mb-4">
        <IoAlertCircle className="h-12 w-12" />
      </div>
      <h2 className="text-xl font-bold text-main">
        No pudimos cargar tus categorías
      </h2>
      <p className="text-muted max-w-sm mt-2 mb-6">
        Hubo un problema al conectar con el servidor. Verifica tu conexión e
        inténtalo nuevamente.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 shadow-sm"
      >
        Recargar página
      </button>
    </div>
  );
}
