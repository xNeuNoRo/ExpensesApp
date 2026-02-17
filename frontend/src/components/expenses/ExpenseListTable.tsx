"use client";

import { formatCurrency, formatDate } from "@/helpers/formatters";
import { safeHex } from "@/helpers/safeHex";
import { sortExpenses } from "@/helpers/sorters";
import { Expense } from "@/schemas/expense";
import { useAppStore } from "@/stores/useAppStore";
import Link from "next/link";
import { useMemo } from "react";
import { IoPencil, IoTrash, IoShapes } from "react-icons/io5";
import SortableHeader from "../shared/SortableHeader";
import StatsBar from "../shared/StatsBar";
import { useExpenseStats } from "@/hooks/shared/useExpenseStats";

type ExpenseListTableProps = {
  expenses?: Expense[];
  isLoading: boolean;
};

export default function ExpenseListTable({
  expenses,
  isLoading,
}: Readonly<ExpenseListTableProps>) {
  const { sortConfig, setSortConfig } = useAppStore((state) => state.expenses);

  const sortedExpenses = useMemo(() => {
    if (!expenses) return [];
    return sortExpenses(expenses, sortConfig.field, sortConfig.direction);
  }, [expenses, sortConfig]);

  const statItems = useExpenseStats(sortedExpenses);

  if (isLoading)
    return <div className="h-96 animate-pulse rounded-xl bg-surface" />;

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
          No hay gastos que coincidan con los filtros seleccionados o aún no has
          registrado ninguno.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <StatsBar items={statItems} />
      <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs uppercase text-muted border-b border-border">
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
            <tbody className="divide-y divide-border">
              {sortedExpenses.map((expense) => {
                const categoryColor = expense.categoryColor;
                const bgColor = safeHex(categoryColor, "20");
                const borderColor = safeHex(categoryColor, "40");

                return (
                  <tr
                    key={expense.id}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-main">
                        {expense.name}
                      </div>
                      <div className="text-xs text-muted truncate max-w-50">
                        {expense.description}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: bgColor ?? "var(--surface)",
                          color: categoryColor ?? "inherit",
                          borderColor: borderColor ?? "var(--border)",
                        }}
                      >
                        {expense.categoryName || "General"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-muted">
                      {formatDate(expense.date)}
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-main">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
