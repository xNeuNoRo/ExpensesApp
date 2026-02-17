"use client";

import { formatCurrency, formatDate } from "@/helpers/formatters";
import { safeHex } from "@/helpers/safeHex";
import { useExpenses } from "@/hooks/expenses/useQueries";
import { useQueryString } from "@/hooks/shared/useQueryString";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import Link from "next/link";
import { IoPencil, IoShapes, IoTrash } from "react-icons/io5";

export default function DashboardRecentExpenses() {
  // Hook personalizado para manejar la generación de URLs con query strings en Next.js
  const { createUrl } = useQueryString();

  // Obtenemos los gastos usando el hook personalizado, sin filtros para mostrar los más recientes
  const { data: expenses, isLoading } = useExpenses({});

  // Función para obtener el componente de icono basado en la clave del icono
  const getIcon = (iconKey?: string | null) => {
    if (!iconKey || !CATEGORY_ICONS[iconKey]) return IoShapes; // Default
    return CATEGORY_ICONS[iconKey];
  };

  if (isLoading)
    return <div className="h-64 animate-pulse rounded-xl bg-surface" />;

  return (
    <div className="rounded-xl border border-border bg-background shadow-sm">
      <div className="border-b border-border p-6">
        <h3 className="font-semibold text-main">Últimos Movimientos (5)</h3>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase text-muted">
            <tr>
              <th scope="col" className="px-6 py-3">
                Gasto
              </th>
              <th scope="col" className="px-6 py-3">
                Categoría
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Monto
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {expenses?.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted">
                  No hay gastos registrados aún.
                </td>
              </tr>
            ) : (
              expenses?.slice(0, 5).map(
                (
                  expense, // Mostramos solo los últimos 5
                ) => {
                  const categoryColor = expense.categoryColor;
                  const IconComponent = getIcon(expense.categoryIcon);
                  const bgColor = safeHex(categoryColor, "20");
                  const borderColor = safeHex(categoryColor, "40");

                  return (
                    <tr
                      key={expense.id}
                      className="hover:bg-surface/50 transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-main">
                        {expense.name}
                        <div className="text-xs font-normal text-muted truncate max-w-50">
                          {expense.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex gap-1.5 items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium shadow-sm"
                          style={{
                            backgroundColor: bgColor ?? "var(--surface)", // Fallback
                            color: categoryColor ?? "inherit", // Color del texto
                            borderColor: borderColor ?? "var(--border)", // Fallback
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
                      <td className="px-6 py-4 text-right font-medium text-main">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={createUrl({
                              action: "edit-expense",
                              expenseId: expense.id,
                            })}
                            scroll={false}
                            className="inline-flex items-center justify-center rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-primary"
                            title="Editar gasto"
                          >
                            <IoPencil className="h-5 w-5" />
                          </Link>
                          <Link
                            href={createUrl({
                              action: "delete-expense",
                              expenseId: expense.id,
                            })}
                            scroll={false}
                            className="p-2 text-muted hover:text-danger transition-colors"
                            title="Eliminar"
                          >
                            <IoTrash className="h-5 w-5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
