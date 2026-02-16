import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getExpenses, getExpensesSummary } from "@/api/ExpensesAPI";
import { expenseKeys } from "@/lib/queryKeys";
import DashboardSummaryCards from "@/components/dashboard/DashboardSummaryCards";
import DashboardRecentExpenses from "@/components/dashboard/DashboardRecentExpenses";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import CreateExpenseModal from "@/components/expenses/modals/CreateExpenseModal";
import EditExpenseModal from "@/components/expenses/modals/EditExpenseModal";
import DeleteExpenseModal from "@/components/expenses/modals/DeleteExpenseModal";

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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-main">
            Dashboard
          </h1>
          <p className="text-muted">
            Bienvenido de nuevo, aquí tienes el resumen de tus finanzas.
          </p>
        </div>

        {/* Cards a modo de resumen */}
        <DashboardSummaryCards />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-main">
              Gastos Recientes
            </h2>

            <Link
              href="/?action=create-expense" // Enlace para abrir el modal de creación de gasto
              scroll={false} // Evita el scroll al hacer clic, ya que el modal se superpone
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-sm active:scale-95"
            >
              <IoAddCircle className="h-5 w-5" />
              <span>Nuevo Gasto</span>
            </Link>
          </div>

          <DashboardRecentExpenses />
        </div>

        <CreateExpenseModal />
        <EditExpenseModal />
        <DeleteExpenseModal />
      </div>
    </HydrationBoundary>
  );
}
