import { StateCreator } from "zustand";
import { ExpenseSortField, SortConfig, SortDirection } from "@/types";

// Tipo para el slice de gastos
export type ExpenseSliceType = {
  expenses: {
    // Estado
    sortConfig: SortConfig;
    // Comportamiento
    setSortConfig: (field: ExpenseSortField) => void;
  };
};

// Función para crear el slice de gastos, que incluye el estado inicial y las funciones para actualizarlo
export const createExpenseSlice: StateCreator<ExpenseSliceType> = (set) => ({
  expenses: {
    // Configuración inicial: Más recientes primero
    sortConfig: {
      field: "date",
      direction: "desc",
    },

    // Función para actualizar la configuración de ordenamiento,
    // que implementa una lógica de toggle para cambiar entre ascendente y descendente
    setSortConfig: (field) =>
      set((state) => {
        const current = state.expenses.sortConfig;

        // Si clicamos el mismo campo => invertimos dirección
        // Si es campo nuevo => ponemos 'desc' por defecto
        const direction: SortDirection =
          current.field === field && current.direction === "desc"
            ? "asc"
            : "desc";

        // Retornamos el nuevo estado con la configuración de ordenamiento actualizada
        return {
          expenses: {
            ...state.expenses,
            sortConfig: { field, direction },
          },
        };
      }),
  },
});
