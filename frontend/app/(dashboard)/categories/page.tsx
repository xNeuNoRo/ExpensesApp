import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { categoryKeys } from "@/lib/queryKeys";
import { getCategories, searchCategoriesByName } from "@/api/CategoriesAPI";
import CategoriesPageContent from "@/components/categories/CategoriesPageContent";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Creamos una instancia de QueryClient para manejar la cache de React Query en el servidor
  const queryClient = new QueryClient();

  // Esperamos a resolver los searchParams para obtener el término de búsqueda
  const { q = "" } = await searchParams;

  // Prefetch de las categorías para que estén disponibles inmediatamente en el cliente
  await queryClient.prefetchQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  });

  // Si hay un término de búsqueda válido (al menos 3 caracteres), 
  // prefetch de los resultados de búsqueda para que estén disponibles inmediatamente en el cliente
  if (typeof q == "string" && q.trim().length >= 3) {
    await queryClient.prefetchQuery({
      queryKey: categoryKeys.search(q),
      queryFn: () => searchCategoriesByName(q),
    });
  }

  // Devolvemos el componente de contenido envuelto en un HydrationBoundary
  // con el estado de la cache de React Query pre-cargada
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesPageContent />
    </HydrationBoundary>
  );
}