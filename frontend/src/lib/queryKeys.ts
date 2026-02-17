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
  list: <T extends object>(filters?: Readonly<T>) =>
    [...expenseKeys.lists(), { filters: filters ?? {} }] as const,
  detail: (id: string) => [...expenseKeys.all, "detail", id] as const,
  summary: <T extends object>(filters?: Readonly<T>) =>
    [...expenseKeys.all, "summary", { filters: filters ?? {} }] as const,
  report: (year: number, month: number) =>
    [...expenseKeys.all, "report", { year, month }] as const,
};
