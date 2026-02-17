"use client";

import { formatCurrency, formatDate } from "@/helpers/formatters";
import { safeHex } from "@/helpers/safeHex";
import { sortExpenses } from "@/helpers/sorters";
import { Expense } from "@/schemas/expense";
import { useAppStore } from "@/stores/useAppStore";
import Link from "next/link";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef } from "react";
import { IoPencil, IoTrash, IoShapes } from "react-icons/io5";
import SortableHeader from "../shared/SortableHeader";
import StatsBar from "../shared/StatsBar";
import { useExpenseStats } from "@/hooks/shared/useExpenseStats";
import { CATEGORY_ICONS } from "@/lib/category-icons";

type ExpenseListTableProps = {
  expenses?: Expense[];
  isLoading: boolean;
};

export default function ExpenseListTable({
  expenses,
  isLoading,
}: Readonly<ExpenseListTableProps>) {
  const { sortConfig, setSortConfig } = useAppStore((state) => state.expenses);

  // Referencia para el contenedor de la tabla, necesaria para la virtualización
  const parentRef = useRef<HTMLDivElement>(null);

  // Ordenamos los gastos usando useMemo para evitar cálculos innecesarios en cada renderizado.
  // La función sortExpenses se encarga de ordenar el array de gastos según el campo y
  // la dirección especificados en sortConfig.
  const sortedExpenses = useMemo(() => {
    if (!expenses) return [];
    return sortExpenses(expenses, sortConfig.field, sortConfig.direction);
  }, [expenses, sortConfig]);

  // Función para obtener el componente de icono basado en la clave del icono
  const getIcon = (iconKey?: string | null) => {
    if (!iconKey || !CATEGORY_ICONS[iconKey]) return IoShapes; // Default
    return CATEGORY_ICONS[iconKey];
  };

  // Obtenemos las estadísticas de gastos usando el hook personalizado, pasando los gastos ordenados
  const statItems = useExpenseStats(sortedExpenses);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: sortedExpenses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 73, // Altura estimada de cada fila en píxeles
    overscan: 5, // Cantidad de elementos extra a renderizar fuera de vista
  });

  // Cálculo de los espacios de padding superior e inferior
  // para mantener el scroll correcto en el virtualizador
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.at(-1)?.end || 0) : 0;

  // Si los datos aún se están cargando, mostramos un placeholder animado
  if (isLoading)
    return <div className="h-96 animate-pulse rounded-xl bg-surface" />;

  // Si no hay gastos, mostramos un mensaje indicando que no se encontraron resultados.
  if (!expenses?.length) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background text-center p-8">
        <div className="rounded-full bg-surface p-4 mb-4">
          <IoShapes className="h-8 w-8 text-muted" />
        </div>
        <h3 className="text-lg font-medium text-main">
          No se encontraron gastos
        </h3>
        <p className="text-muted max-w-sm mt-1">
          No hay gastos que coincidan con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <StatsBar items={statItems} />
      <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
        <div
          ref={parentRef}
          className="relative overflow-auto w-full max-h-91.25 scrollbar-thin"
        >
          <table className="min-w-175 w-full text-left text-sm border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-surface text-xs uppercase text-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Gasto</th>
                <th className="px-6 py-4 font-semibold">Categoría</th>
                <SortableHeader
                  field="date"
                  label="Fecha"
                  currentSort={sortConfig}
                  onSort={setSortConfig}
                />
                <SortableHeader
                  field="amount"
                  label="Monto"
                  align="right"
                  currentSort={sortConfig}
                  onSort={setSortConfig}
                />
                <th className="px-6 py-4 font-semibold text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {/* Espaciador Superior */}
              {paddingTop > 0 && (
                // Si hay espacio de padding superior,
                // renderizamos una fila vacía con la altura del padding para mantener el scroll correcto
                <tr>
                  <td style={{ height: `${paddingTop}px` }} colSpan={5} />
                </tr>
              )}

              {/* Filas Virtuales */}
              {virtualRows.map((virtualRow) => {
                const expense = sortedExpenses[virtualRow.index];
                const categoryColor = expense.categoryColor;
                const IconComponent = getIcon(expense.categoryIcon);
                const bgColor = safeHex(categoryColor, "20");
                const borderColor = safeHex(categoryColor, "40");

                return (
                  <tr
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    className="hover:bg-surface/50 transition-colors border-b border-border last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-main truncate">
                        {expense.name}
                      </div>
                      <div className="text-xs text-muted truncate max-w-50">
                        {expense.description}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="inline-flex gap-1.5 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: bgColor ?? "var(--surface)",
                          color: categoryColor ?? "inherit",
                          borderColor: borderColor ?? "var(--border)",
                        }}
                      >
                        <IconComponent className="h-3.5 w-3.5 shrink-0" />

                        <span className="truncate max-w-25">
                          {expense.categoryName || "Sin Categoría"}
                        </span>
                      </span>
                    </td>

                    <td className="px-6 py-4 text-muted">
                      {formatDate(expense.date)}
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-main tabular-nums">
                      {formatCurrency(expense.amount)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/expenses?action=edit-expense&expenseId=${expense.id}`}
                          scroll={false}
                          className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-primary"
                        >
                          <IoPencil className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`/expenses?action=delete-expense&expenseId=${expense.id}`}
                          scroll={false}
                          className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-danger"
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
                // Si hay espacio de padding inferior,
                // renderizamos una fila vacía con la altura del padding para mantener el scroll correcto
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} colSpan={5} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
