import {
  createExpenseAction,
  deleteExpenseAction,
  exportReportAction,
  updateExpenseAction,
} from "@/actions/expense-actions";
import { categoryKeys, expenseKeys } from "@/lib/queryKeys";
import { ReportDate } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Hook para crear un nuevo gasto
export function useCreateExpense() {
  // Obtenemos el cliente de consultas de React Query para poder manipular la cache de consultas
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpenseAction,
    onSuccess: () => {
      // Mostramos un mensaje de éxito al usuario después de crear el gasto
      toast.success("Gasto creado exitosamente");

      // Aqui no confiaremos en el pessimistic update por la complejidad que seria llevarlo a cabo correctamente
      // Ya que necesitamos relacionarlo correctamente con la categoria de gastos tambien, lo ideal seria
      // que el backend se encargue y nosotros simplemente invalidamos la query para consultar nuevamente.

      // Invalidamos la query de gastos para que se vuelva a consultar
      // en segundo plano en caso de que haya alguna inconsistencia
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      // Invalidamos la query de categorias también por si el nuevo gasto afecta a alguna categoría
      // (ejemplo: si es el primer gasto de una categoría nueva)
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
    onError: (err) => {
      // Mostramos un mensaje de error al usuario si ocurre un error al crear el gasto
      toast.error(err.message);
    },
  });
}

// Hook para actualizar un gasto existente
export function useUpdateExpense() {
  // Obtenemos el cliente de consultas de React Query para poder manipular la cache de consultas
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpenseAction,
    onSuccess: () => {
      // Mostramos un mensaje de éxito al usuario después de actualizar el gasto
      toast.success("Gasto actualizado exitosamente");
      // Invalidamos la query de gastos para que se vuelva a consultar
      // en segundo plano y así obtener los datos actualizados
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      // Invalidamos la query de categorias también por si el gasto cambió de categoría
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
    onError: (err) => {
      // Mostramos un mensaje de error al usuario si ocurre un error al actualizar el gasto
      toast.error(err.message);
    },
  });
}

// Hook para eliminar un gasto
export function useDeleteExpense() {
  // Obtenemos el cliente de consultas de React Query para poder manipular la cache de consultas
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpenseAction,
    onSuccess: () => {
      // Mostramos un mensaje de éxito al usuario después de eliminar el gasto
      toast.success("Gasto eliminado exitosamente");
      // Invalidamos la query de gastos para que se vuelva a consultar
      // en segundo plano y así obtener los datos actualizados
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      // Invalidamos la query de categorias también
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
    onError: (err) => {
      // Mostramos un mensaje de error al usuario si ocurre un error al eliminar el gasto
      toast.error(err.message);
    },
  });
}

// Hook para exportar el reporte mensual de gastos
export function useExportReport() {
  return useMutation({
    mutationFn: (reportDate: ReportDate) =>
      exportReportAction(reportDate.month, reportDate.year),
    onSuccess: (fileName) => {
      // Mostramos un mensaje de éxito al usuario después de exportar el reporte
      toast.success(`Reporte exportado exitosamente (archivo: ${fileName})`);
    },
    onError: (err) => {
      // Mostramos un mensaje de error al usuario si ocurre un error al exportar el reporte
      toast.error(err.message);
    },
  });
}
