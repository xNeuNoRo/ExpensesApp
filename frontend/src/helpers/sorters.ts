import { Expense } from "@/schemas/expense";
import { ExpenseSortField, SortDirection } from "@/types";

/**
 * @description Función para ordenar una lista de gastos según un campo y dirección especificados.
 * @param expenses El array de gastos que se desea ordenar. Cada gasto debe tener al menos los campos "date" y "amount" para poder ser ordenados.
 * @param field El campo por el cual se desea ordenar los gastos. Puede ser "date" para ordenar por fecha o "amount" para ordenar por monto.
 * @param direction La dirección del ordenamiento, que puede ser "asc" para orden ascendente o "desc" para orden descendente.
 * @returns Un nuevo array de gastos ordenado según el campo y dirección especificados. El array original no se modifica (inmutabilidad).
 */
export function sortExpenses(
  expenses: Expense[],
  field: ExpenseSortField,
  direction: SortDirection,
): Expense[] {
  // Creamos una copia superficial para no mutar el array original (principio de inmutabilidad)
  return [...expenses].sort((a, b) => {
    // Variables para almacenar los valores a comparar,
    // que pueden ser fechas o montos según el campo de ordenamiento
    let valA: number;
    let valB: number;

    // Obtenemos los valores a comparar según el campo de ordenamiento
    switch (field) {
      case "date":
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
        break;
      case "amount":
        valA = a.amount;
        valB = b.amount;
        break;
      default:
        return 0;
    }

    // Comparación de los valores para determinar el orden,
    // teniendo en cuenta la dirección de ordenamiento (ascendente o descendente)
    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;

    // Si los valores son iguales, mantenemos el orden original (estabilidad de la ordenación)
    return 0;
  });
}
