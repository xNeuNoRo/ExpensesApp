import Link from "next/link";
import { IoCompass, IoArrowBack } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Icono animado */}
      <div className="mb-6 rounded-full bg-surface p-6 shadow-sm ring-1 ring-border animate-bounce">
        <IoCompass className="h-16 w-16 text-primary" />
      </div>

      {/* Título y Mensaje */}
      <h1 className="text-4xl font-black text-main tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-semibold text-main mb-4">
        Página no encontrada
      </h2>
      <p className="text-muted max-w-md mb-8">
        Lo sentimos, no pudimos encontrar la página que estás buscando. Puede
        que haya sido movida o eliminada.
      </p>

      {/* Botón de regreso */}
      <Link
        href="/"
        className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-95"
      >
        <IoArrowBack className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Volver al Dashboard
      </Link>
    </div>
  );
}
