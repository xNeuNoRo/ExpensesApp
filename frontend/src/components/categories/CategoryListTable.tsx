"use client";

import { useRef } from "react";
import Link from "next/link";
import { useVirtualizer } from "@tanstack/react-virtual";
import { IoCreate, IoShapes, IoTrash } from "react-icons/io5";
import { formatCurrency } from "@/helpers/formatters";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { Category } from "@/schemas/category"; // Asegúrate de importar tu tipo
import { useQueryString } from "@/hooks/shared/useQueryString";

interface CategoryListTableProps {
  categories: Category[];
  isLoading: boolean;
}

export default function CategoryListTable({
  categories,
  isLoading,
}: Readonly<CategoryListTableProps>) {
  // Hook personalizado para manejar la generación de URLs con query strings en Next.js
  const { createUrl } = useQueryString();

  // Configuración de virtualización para la tabla de categorías
  const parentRef = useRef<HTMLDivElement>(null);

  // Virtualización de filas usando useVirtualizer de TanStack Virtual
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: categories?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 69,
    overscan: 5,
  });

  // Obtenemos las filas virtuales que deben renderizarse y el tamaño total para calcular los paddings
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  // Cálculo de padding para simular el espacio de las filas no renderizadas en la parte superior e inferior de la tabla
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows.at(-1)?.end || 0) : 0;

  // Función auxiliar para obtener el componente de ícono basado en la clave del ícono de la categoría
  const getIcon = (iconKey?: string | null) => {
    if (!iconKey || !CATEGORY_ICONS[iconKey]) return IoShapes;
    return CATEGORY_ICONS[iconKey];
  };

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

                {virtualRows.map((virtualRow) => {
                  // Obtenemos la categoría correspondiente a la fila virtual actual
                  const cat = categories[virtualRow.index];
                  // Obtenemos el componente de ícono para la categoría actual
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
                            href={createUrl({
                              action: "edit-category",
                              categoryId: cat.id,
                            })}
                            scroll={false}
                            className="rounded-lg p-2 text-muted hover:bg-surface hover:text-primary transition-colors"
                            title="Editar categoría"
                          >
                            <IoCreate className="h-5 w-5" />
                          </Link>
                          <Link
                            href={createUrl({
                              action: "delete-category",
                              categoryId: cat.id,
                            })}
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
