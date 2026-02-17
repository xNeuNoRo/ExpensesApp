"use client";

import { formatCurrency } from "@/helpers/formatters";
import { useExpensesSummary } from "@/hooks/expenses/useQueries";
import { IoWallet, IoPricetags, IoTrendingUp } from "react-icons/io5";

export default function DashboardSummaryCards() {
  // Consumimos el hook. Al haber hecho prefetch en el servidor,
  // los datos estarán listos instantáneamente al montar el componente, evitando el estado de carga.
  const { data: summary, isLoading } = useExpensesSummary({});

  if (isLoading)
    return <div className="h-32 animate-pulse rounded-xl bg-surface" />;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* Card 1: Gasto Total */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Gasto Total</p>
            <h3 className="mt-2 text-2xl font-bold text-main">
              {formatCurrency(summary?.total ?? 0)}
            </h3>
          </div>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <IoWallet className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Card 2: Cantidad de Transacciones */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted">
              Transacciones / Gastos Totales
            </p>
            <h3 className="mt-2 text-2xl font-bold text-main">
              {summary?.count ?? 0}
            </h3>
          </div>
          <div className="rounded-full bg-secondary/10 p-3 text-secondary">
            <IoPricetags className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Card 3: Promedio por Gasto */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Promedio</p>
            <h3 className="mt-2 text-2xl font-bold text-main">
              {formatCurrency(summary?.average ?? 0)}
            </h3>
          </div>
          <div className="rounded-full bg-warning/10 p-3 text-warning">
            <IoTrendingUp className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
