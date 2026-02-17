import { getMonthlyReport } from "@/api/ExpensesAPI";
import ReportsPageContent from "@/components/reports/ReportsPageContent";
import { expenseKeys } from "@/lib/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Creamos una instancia de QueryClient para manejar la cache de React Query en el servidor
  const queryClient = new QueryClient();

  // Esperamos a que los parámetros de búsqueda estén disponibles
  const sp = await searchParams;

  // Calculamos los valores por defecto (Fecha actual) igual que en el cliente
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Parseamos los parámetros de la URL o usamos los defaults
  // Esto asegura que la llave del caché (queryKey) sea idéntica a la del cliente
  const month = Number(sp.month) || currentMonth;
  const year = Number(sp.year) || currentYear;

  // Prefetch del reporte mensual con los filtros de mes y año
  // para que esté disponible inmediatamente en el cliente
  await queryClient.prefetchQuery({
    queryKey: expenseKeys.report(year, month),
    queryFn: () => getMonthlyReport({ year, month }),
  });

  // Enviamos el estado hidratado al cliente
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReportsPageContent initialMonth={month} initialYear={year} />
    </HydrationBoundary>
  );
}
