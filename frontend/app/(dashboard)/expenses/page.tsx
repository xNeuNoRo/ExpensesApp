import { getExpenses } from "@/api/ExpensesAPI";
import ExpensesPageContent from "@/components/expenses/ExpensesPageContent";
import { expenseKeys } from "@/lib/queryKeys";
import { ExpenseFilter } from "@/schemas/expense";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Creamos una instancia de QueryClient para manejar la cache de React Query en el servidor
  const queryClient = new QueryClient();

  // Esperamos a resolver los searchParams para obtener los filtros activos
  const sp = await searchParams;

  // Función auxiliar para convertir un parámetro de búsqueda en una cadena, manejando el caso de arrays
  const getString = (param: string | string[] | undefined) => {
    if (Array.isArray(param)) return param[0]; // Si es array, tomamos el primero
    return param || null;
  };

  // Construimos el objeto de filtros a partir de los parámetros de búsqueda
  const filters: ExpenseFilter = {
    categoryId: getString(sp.categoryId),
    startDate: getString(sp.startDate),
    endDate: getString(sp.endDate),
  };

  // Prefetch de los gastos con los filtros aplicados para que estén disponibles inmediatamente en el cliente
  await queryClient.prefetchQuery({
    queryKey: expenseKeys.list(filters),
    queryFn: () => getExpenses(filters),
  });

  // Devolvemos el componente de contenido envuelto en un HydrationBoundary
  // con el estado de la cache de React Query pre-cargada
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExpensesPageContent />
    </HydrationBoundary>
  );
}
