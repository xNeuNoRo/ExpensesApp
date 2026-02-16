import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/actions/category-actions";
import { categoryKeys, expenseKeys } from "@/lib/queryKeys";
import { Category } from "@/schemas/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateCategory() {
  // Obtenemos el cliente de consultas de React Query para poder manipular la cache de consultas
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryAction,
    onSuccess: (data) => {
      // Mostramos un mensaje de éxito al usuario después de crear la categoría
      toast.success("Categoría creada exitosamente");
      // Pessimistic update: actualizamos la cache de categorías después de crear una nueva categoría
      queryClient.setQueryData(
        categoryKeys.lists(),
        (oldData: Category[] | undefined) => {
          if (!oldData) return [data];
          // Si la categoría ya existe en la cache (lo cual no debería pasar pero por si acaso), no la agregamos de nuevo
          if (oldData.some((cat) => cat.id === data.id)) return oldData;
          return [...oldData, data];
        },
      );
      // Invalidamos la query tambien para que se vuelva a consultar
      // en segundo plano en caso de que haya alguna inconsistencia
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
    onError: (err) => {
      // Mostramos un mensaje de error al usuario si ocurre un error al crear la categoría
      toast.error(err.message);
    },
  });
}

export function useUpdateCategory() {
  // Obtenemos el cliente de consultas de React Query para poder manipular la cache de consultas
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryAction,
    onSuccess: () => {
      // Mostramos un mensaje de éxito al usuario después de actualizar la categoría
      toast.success("Categoría actualizada exitosamente");

      // Aqui no hacemos pessimistic update puesto que el backend no retorna los datos actualizados

      // Invalidamos las queries de categorías y gastos para que se vuelvan a consultar
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
    onError: (err) => {
      // Mostramos un mensaje de error al usuario si ocurre un error al actualizar la categoría
      toast.error(err.message);
    },
  });
}

export function useDeleteCategory() {
  // Obtenemos el cliente de consultas de React Query para poder manipular la cache de consultas
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: () => {
      // Mostramos un mensaje de éxito al usuario después de eliminar la categoría
      toast.success("Categoría eliminada exitosamente");

      // Aqui no hacemos pessimistic update puesto que el backend no retorna los datos eliminados

      // Invalidamos las queries de categorías y gastos para que se vuelvan a consultar
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
    onError: (err) => {
      // Mostramos un mensaje de error al usuario si ocurre un error al eliminar la categoría
      toast.error(err.message);
    },
  });
}
