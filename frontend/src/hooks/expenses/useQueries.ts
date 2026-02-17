import {
  getExpenseById,
  getExpenses,
  getExpensesSummary,
  getMonthlyReport,
} from "@/api/ExpensesAPI";
import { expenseKeys } from "@/lib/queryKeys";
import { Expense, ExpenseFilter } from "@/schemas/expense";
import { useQuery } from "@tanstack/react-query";

// Hook para obtener la lista de gastos con filtros opcionales
export function useExpenses(filters: ExpenseFilter = {}) {
  return useQuery({
    queryKey: expenseKeys.list(filters),
    queryFn: () => getExpenses(filters),
    staleTime: 1000 * 60 * 1, // 1 minuto de stale time (para que sea invalida la cache basicamente)
  });
}

// Hook para obtener el resumen de gastos con filtros opcionales
export function useExpensesSummary(filters: ExpenseFilter = {}) {
  return useQuery({
    queryKey: expenseKeys.summary(filters),
    queryFn: () => getExpensesSummary(filters),
    staleTime: 1000 * 60 * 1, // 1 minuto de stale time (para que sea invalida la cache basicamente)
  });
}

// Hook para obtener el reporte mensual de gastos
export function useMonthlyReport(month: number, year: number) {
  return useQuery({
    queryKey: expenseKeys.report(year, month),
    queryFn: () => getMonthlyReport({ year, month }),
    staleTime: 1000 * 60 * 1, // 1 minuto de stale time (para que sea invalida la cache basicamente)
  });
}

// Hook para obtener un gasto específico por su ID
export function useExpense(id: Expense["id"]) {
  return useQuery({
    queryKey: expenseKeys.detail(id),
    queryFn: () => getExpenseById(id),
    enabled: !!id, // Solo ejecutar la consulta si el ID es válido
  });
}
