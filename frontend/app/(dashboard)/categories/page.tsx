import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { categoryKeys } from "@/lib/queryKeys";
import { getCategories } from "@/api/CategoriesAPI";
import Link from "next/link";
import { IoAddCircle } from "react-icons/io5";
import CategoryList from "@/components/categories/CategoryList";
import CreateCategoryModal from "@/components/categories/modals/CreateCategoryModal";
import EditCategoryModal from "@/components/categories/modals/EditCategoryModal";
import DeleteCategoryModal from "@/components/categories/modals/DeleteCategoryModal";

export default async function CategoriesPage() {
  // Creamos un nuevo cliente de consultas de React Query para manejar el prefetching de datos
  const queryClient = new QueryClient();

  // Prefetch de la lista de categorías para que los datos estén disponibles inmediatamente al cargar la página
  await queryClient.prefetchQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
  });

  // Renderizamos la página dentro de un HydrationBoundary para que los datos prefetched 
  // estén disponibles en el cliente sin necesidad de volver a cargarlos
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        {/* Header de la página */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-main">
              Categorías
            </h1>
            <p className="text-muted">
              Gestiona las etiquetas para organizar tus gastos.
            </p>
          </div>

          <Link
            href="/categories?action=create-category"
            scroll={false}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-sm active:scale-95"
          >
            <IoAddCircle className="h-5 w-5" />
            Nueva Categoría
          </Link>
        </div>

        {/* Listado de Categorías */}
        <CategoryList />

        <CreateCategoryModal />
        <EditCategoryModal />
        <DeleteCategoryModal />
      </div>
    </HydrationBoundary>
  );
}
