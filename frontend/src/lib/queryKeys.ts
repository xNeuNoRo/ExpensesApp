// Este archivo define las query keys para las consultas con React Query
// (Asi centralizamos las keys para evitar errores de tipeo y facilitar su mantenimiento)

// Query keys para categorías
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  lookup: () => [...categoryKeys.all, "lookup"] as const,
  detail: (id: string) => [...categoryKeys.all, "detail", id] as const,
  validate: (name: string) => [...categoryKeys.all, "validate", name] as const,
  search: (name: string) => [...categoryKeys.all, "search", name] as const,
};

// Query keys para gastos
export const expenseKeys = {
  all: ["expenses"] as const,
  lists: () => [...expenseKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...expenseKeys.lists(), { filters }] as const,
  detail: (id: string) => [...expenseKeys.all, "detail", id] as const,
  summary: (filters: Record<string, unknown>) =>
    [...expenseKeys.all, "summary", { filters }] as const,
  report: (year: number, month: number) =>
    [...expenseKeys.all, "report", { year, month }] as const,
};
