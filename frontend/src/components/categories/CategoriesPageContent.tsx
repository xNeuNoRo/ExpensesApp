"use client";

import Link from "next/link";
import { IoAddCircle, IoSearch, IoClose } from "react-icons/io5";
import { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/shared/useDebounce";
import {
  useCategories,
  useSearchCategoriesByName,
} from "@/hooks/categories/useQueries";
import CreateCategoryModal from "@/components/categories/modals/CreateCategoryModal";
import EditCategoryModal from "@/components/categories/modals/EditCategoryModal";
import DeleteCategoryModal from "@/components/categories/modals/DeleteCategoryModal";
import CategoryListTable from "./CategoryListTable";
import { useQueryString } from "@/hooks/shared/useQueryString";

export default function CategoriesPageContent() {
  // Hook personalizado para manejar la generación de URLs con query strings en Next.js
  const { createUrl } = useQueryString();

  // Hooks de navegación y estado para el input de búsqueda
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Estado local para el valor del input de búsqueda y su versión debounced
  const queryParam = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(queryParam);

  // Debounce del valor del input para evitar hacer cambios en la URL con cada tick de escritura
  const debouncedInput = useDebounce(inputValue, 400);

  // Efecto para sincronizar el valor debounced del input con el parámetro de búsqueda en la URL
  useEffect(() => {
    // Comparamos el valor actual del parámetro de búsqueda con el valor que queremos establecer basado en el input debounced
    const currentURL = searchParams.get("q") || "";
    // Solo actualizamos la URL si el valor debounced es diferente al valor actual en la URL para evitar navegaciones innecesarias
    const intendedURL =
      debouncedInput.trim().length >= 3 ? debouncedInput.trim() : "";

    // Si el valor que queremos establecer es diferente al actual, actualizamos la URL con el nuevo parámetro de búsqueda
    if (intendedURL !== currentURL) {
      // Creamos una nueva instancia de URLSearchParams basada en los searchParams actuales para modificarla
      const params = new URLSearchParams(searchParams.toString());
      // Si el valor intendedURL es válido (al menos 3 caracteres),
      // lo establecemos en el parámetro "q", de lo contrario lo eliminamos de la URL
      if (intendedURL) params.set("q", intendedURL);
      // Si intendedURL es vacío, eliminamos el parámetro "q" de la URL para limpiar la búsqueda
      else params.delete("q");
      // Reemplazamos la URL actual con la nueva URL que incluye el parámetro de búsqueda actualizado sin hacer scroll
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedInput, pathname, router, searchParams]);

  // Efecto para sincronizar el valor del input con el parámetro de búsqueda en la URL
  // cuando este último cambie por otras vías (ej. navegación manual, botones de adelante/atrás)
  useEffect(() => {
    // Obtenemos el valor actual del parámetro de búsqueda "q" de la URL
    const urlValue = searchParams.get("q") || "";

    // Solo actualizamos el estado del input si el valor en la URL
    // es diferente al valor actual del input para evitar bucles infinitos
    if (urlValue !== inputValue && urlValue !== debouncedInput) {
      const id = setTimeout(() => {
        setInputValue(urlValue);
      }, 0);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Hooks para obtener las categorías y los resultados de búsqueda basados en el queryParam
  const { data: allCategories, isLoading: isLoadingAll } = useCategories();
  const { data: searchResults, isFetching: isSearching } =
    useSearchCategoriesByName(queryParam);

  // Memoización de la lista de categorías a mostrar en la tabla, que depende del queryParam y los resultados obtenidos
  const categories = useMemo(() => {
    if (queryParam.trim().length >= 3) {
      return searchResults ?? [];
    }
    return allCategories ?? [];
  }, [queryParam, allCategories, searchResults]);

  return (
    <div className="space-y-8">
      {/* Header Original */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-main">
            Categorías
          </h1>
          <p className="text-muted">
            Gestiona las etiquetas para organizar tus gastos.
          </p>
        </div>

        <Link
          href={createUrl({ action: "create-category" })}
          scroll={false}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-sm active:scale-95"
        >
          <IoAddCircle className="h-5 w-5" />
          Nueva Categoría
        </Link>
      </div>

      {/* Input de Búsqueda Original */}
      <div className="relative max-w-md group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IoSearch className={inputValue ? "text-primary" : "text-muted"} />
        </div>
        <input
          type="text"
          className="block w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-main placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
          placeholder="Buscar categorías (mín. 3 caracteres)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-danger hover:cursor-pointer"
          >
            <IoClose className="h-6 w-6" />
          </button>
        )}

        {isSearching && (
          <div className="absolute -bottom-5 left-2 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
            <span className="text-[10px] font-medium text-primary">
              Sincronizando con servidor...
            </span>
          </div>
        )}
      </div>

      {/* Tabla De Categorias */}
      <CategoryListTable
        categories={categories}
        isLoading={isLoadingAll && !queryParam}
      />

      <CreateCategoryModal />
      <EditCategoryModal />
      <DeleteCategoryModal />
    </div>
  );
}
