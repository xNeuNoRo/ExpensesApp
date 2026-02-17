// Tipo para representar un mes y año específico, utilizado para generar reportes mensuales
export type ReportDate = {
  year: number;
  month: number;
};

// Tipos para la configuración de ordenamiento de gastos
export type SortDirection = "asc" | "desc";
export type ExpenseSortField = "date" | "amount";

// Tipo para la configuración de ordenamiento, 
// que incluye el campo por el que se ordena y la dirección del ordenamiento
export type SortConfig = {
  field: ExpenseSortField;
  direction: SortDirection;
};
