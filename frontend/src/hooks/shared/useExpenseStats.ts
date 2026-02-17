import { useMemo } from "react";
import { Expense } from "@/schemas/expense";
import { formatCurrency } from "@/helpers/formatters";
import { StatItem } from "@/components/shared/StatsBar";

/**
 * @description Hook personalizado para calcular estadísticas de gastos a partir de una lista de gastos. Este hook toma un array de gastos como entrada y devuelve un array de objetos que representan diferentes estadísticas, como el total gastado, el número de movimientos, el gasto promedio y el gasto máximo.
 * @param expenses Un array de objetos de tipo Expense que representa la lista de gastos para los cuales se desean calcular las estadísticas. Cada objeto de gasto debe tener al menos un campo "amount" que representa el monto del gasto. El array puede ser undefined o vacío, en cuyo caso el hook retornará un array vacío de estadísticas.
 * @returns Un array de objetos de tipo StatItem, donde cada objeto representa una estadística específica. Cada objeto tiene un campo "label" que describe la estadística (por ejemplo, "Total", "Movimientos", "Promedio", "Mayor Gasto") y un campo "value" que contiene el valor calculado para esa estadística. El valor del total, promedio y mayor gasto se formatea como una cadena de texto con formato de moneda utilizando la función formatCurrency. Si el array de gastos es undefined o vacío, el hook retornará un array vacío.
 */
export function useExpenseStats(expenses: Expense[] | undefined): StatItem[] {
  return useMemo(() => {
    // Si no hay gastos o el array está vacío, retornamos un array vacío de estadísticas
    if (!expenses || expenses.length === 0) return [];

    // Cálculos matemáticos
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const count = expenses.length;
    const average = count > 0 ? total / count : 0;
    const max = count > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;

    // Retornamos un array de objetos de estadísticas,
    // formateando los valores numéricos como cadenas de texto con formato de moneda
    return [
      {
        label: "Movimientos",
        value: count,
      },
      {
        label: "Promedio",
        value: formatCurrency(average),
      },
      {
        label: "Mayor Gasto",
        value: formatCurrency(max),
        hiddenOnMobile: true,
      },
      {
        label: "Total",
        value: formatCurrency(total),
        variant: "highlight", // Destacado
      },
    ];
  }, [expenses]);
}
