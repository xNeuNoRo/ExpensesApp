import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getExpenses, getExpensesSummary } from "@/api/ExpensesAPI";
import { expenseKeys } from "@/lib/queryKeys";
import DashboardSummaryCards from "@/components/dashboard/DashboardSummaryCards";
import DashboardRecentExpenses from "@/components/dashboard/DashboardRecentExpenses";

// Este componente es de SERVIDOR. Aquí hacemos el Prefetching.
// Asi el cliente recibe el estado ya cargado y no tiene que esperar
// a que se haga la consulta al montar el componente UI (que es cliente).
export default async function DashboardPage() {
  const queryClient = new QueryClient();

  // Prefetch del Resumen de Gastos para mostrar en las tarjetas resumen
  await queryClient.prefetchQuery({
    queryKey: expenseKeys.summary({}),
    queryFn: () => getExpensesSummary({}),
  });

  // Prefetch de la lista de gastos para mostrar en la tabla
  await queryClient.prefetchQuery({
    queryKey: expenseKeys.list({}),
    queryFn: () => getExpenses({}),
  });

  return (
    // Hidratamos el estado para que los componentes cliente (UI) lo reciban al instante
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-main">
            Dashboard
          </h1>
          <p className="text-muted">
            Bienvenido de nuevo, aquí tienes el resumen de tus finanzas.
          </p>
        </div>

        <DashboardSummaryCards />
        <DashboardRecentExpenses />
      </div>
    </HydrationBoundary>
  );
}
