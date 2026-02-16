import {
  getCategories,
  getCategoryById,
  lookupCategories,
} from "@/api/CategoriesAPI";
import { categoryKeys } from "@/lib/queryKeys";
import { Category } from "@/schemas/category";
import { useQuery } from "@tanstack/react-query";

// Hook para obtener la lista de categorías de gastos
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time (para que sea invalida la cache basicamente)
  });
}

// Hook para obtener el lookup de categorías (solo ID y nombre)
export function useCategoriesLookup() {
  return useQuery({
    queryKey: categoryKeys.lookup(),
    queryFn: lookupCategories,
  });
}

// Hook para obtener los detalles de una categoría específica por su ID
export function useCategory(id: Category["id"]) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: !!id, // Solo habilitar la consulta si el ID es válido (no nulo o indefinido)
  });
}
