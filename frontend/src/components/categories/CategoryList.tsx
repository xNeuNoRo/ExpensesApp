"use client";

import { formatCurrency } from "@/helpers/formatters";
import { useCategories } from "@/hooks/categories/useQueries";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import Link from "next/link";
import { useVirtualizer } from "@tanstack/react-virtual";
import { IoCreate, IoShapes, IoTrash } from "react-icons/io5";
import { useRef } from "react";

export default function CategoryList() {
  // Obtención de categorías y estado de carga usando el hook personalizado
  const { data: categories, isLoading } = useCategories();

  // Referencia al contenedor del scroll para el virtualizador
  const parentRef = useRef<HTMLDivElement>(null);

  // Configuración del virtualizador de filas para la tabla de categorías
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: categories?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 69, // Altura estimada de la fila de categoria
    overscan: 5,
  });

  // Cálculo de los espacios de padding superior e inferior
  // para mantener el scroll correcto en el virtualizador
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows.at(-1)?.end || 0) : 0;

  // Función para obtener el componente de icono basado en la clave del icono
  const getIcon = (iconKey?: string | null) => {
    if (!iconKey || !CATEGORY_ICONS[iconKey]) return IoShapes; // Default
    return CATEGORY_ICONS[iconKey];
  };

  // Renderizado de un placeholder de carga mientras se obtienen las categorías
  if (isLoading)
    return <div className="h-64 animate-pulse rounded-xl bg-surface" />;

  return (
    <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
      <div
        ref={parentRef}
        className="relative overflow-auto w-full max-h-149.5 scrollbar-thin"
      >
        <table className="min-w-200 w-full text-left text-sm border-collapse table-fixed">
          <thead className="sticky top-0 z-10 bg-surface text-xs uppercase text-muted border-b border-border shadow-sm">
            <tr>
              <th className="px-6 py-4 font-semibold w-1/2">Nombre</th>
              <th className="px-6 py-4 font-semibold w-1/4">Presupuesto</th>
              <th className="px-6 py-4 font-semibold text-center w-24">
                Color
              </th>
              <th className="px-6 py-4 font-semibold text-center w-32">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {categories && categories.length > 0 ? (
              <>
                {/* Espaciador Superior */}
                {paddingTop > 0 && (
                  <tr>
                    <td style={{ height: `${paddingTop}px` }} colSpan={4} />
                  </tr>
                )}

                {/* Renderizado de filas visibles */}
                {virtualRows.map((virtualRow) => {
                  const cat = categories[virtualRow.index];
                  const IconComponent = getIcon(cat.iconKey);

                  return (
                    <tr
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={rowVirtualizer.measureElement}
                      className="hover:bg-surface/50 transition-colors"
                    >
                      <td className="px-6 py-3 font-medium text-main">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <span className="truncate block">{cat.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-muted">
                        {formatCurrency(cat.monthlyBudget)}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {cat.color && (
                          <div
                            className="mx-auto h-6 w-6 rounded-full border border-border"
                            style={{ backgroundColor: cat.color }}
                          />
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/categories?action=edit-category&categoryId=${cat.id}`}
                            scroll={false}
                            className="rounded-lg p-2 text-muted hover:bg-surface hover:text-primary transition-colors"
                            title="Editar categoría"
                          >
                            <IoCreate className="h-5 w-5" />
                          </Link>
                          <Link
                            href={`/categories?action=delete-category&categoryId=${cat.id}`}
                            scroll={false}
                            className="rounded-lg p-2 text-muted hover:bg-surface hover:text-danger transition-colors"
                            title="Eliminar categoría"
                          >
                            <IoTrash className="h-5 w-5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Espaciador Inferior */}
                {paddingBottom > 0 && (
                  <tr>
                    <td style={{ height: `${paddingBottom}px` }} colSpan={4} />
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-muted">
                  <div className="flex flex-col items-center gap-2">
                    <IoShapes className="h-8 w-8 opacity-20" />
                    <p>No hay categorías registradas.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
