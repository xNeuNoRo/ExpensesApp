"use client";

import { useState } from "react";
import { useExpenses } from "@/hooks/expenses/useQueries";
import { ExpenseFilter } from "@/schemas/expense";
import ExpenseFilters from "@/components/expenses/ExpenseFilters";
import ExpenseListTable from "@/components/expenses/ExpenseListTable";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import CreateExpenseModal from "@/components/expenses/modals/CreateExpenseModal";
import EditExpenseModal from "@/components/expenses/modals/EditExpenseModal";
import DeleteExpenseModal from "@/components/expenses/modals/DeleteExpenseModal";

export default function ExpensesPage() {
  // Estado inicial de filtros
  const [filters, setFilters] = useState<ExpenseFilter>({
    categoryId: null,
    startDate: null,
    endDate: null,
  });

  // Hook que consulta a la API con los filtros activos
  // React Query re-ejecutará la búsqueda automáticamente cuando 'filters' cambie
  const { data: expenses, isLoading } = useExpenses(filters);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-main">
            Mis Gastos
          </h1>
          <p className="text-muted">
            Consulta y gestiona tu historial completo de movimientos.
          </p>
        </div>

        <Link
          href="/expenses?action=create-expense"
          scroll={false}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-sm active:scale-95"
        >
          <IoAddCircle className="h-5 w-5" />
          Nuevo Gasto
        </Link>
      </div>

      {/* Panel de Filtros */}
      <ExpenseFilters filters={filters} onFilterChange={setFilters} />

      {/* Tabla de Resultados */}
      <ExpenseListTable expenses={expenses} isLoading={isLoading} />

      <CreateExpenseModal />
      <EditExpenseModal />
      <DeleteExpenseModal />
    </div>
  );
}
