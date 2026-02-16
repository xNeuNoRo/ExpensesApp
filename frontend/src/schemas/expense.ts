import { z } from "zod";

// Esquema para un gasto
export const ExpenseSchema = z.object({
  id: z.uuid("El ID debe ser un UUID válido."),
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  date: z.string(), // ISO String de la fecha del gasto que viene del backend
  categoryId: z.uuid(),
  categoryName: z.string().optional(),
});

// Esquema para crear un gasto
export const CreateExpenseSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del gasto es obligatorio.")
    .max(150, "El nombre es demasiado largo."),
  description: z.string().min(1, "La descripción es obligatoria."),
  amount: z.number().positive("El monto debe ser mayor a 0."),
  date: z.string().min(1, "La fecha es obligatoria."), // Usaremos strings de HTML date input o ISO
  categoryId: z.uuid("Debes seleccionar una categoría válida."),
});

// Esquema para actualizar un gasto
export const UpdateExpenseSchema = CreateExpenseSchema;

// Esquema para filtrar gastos en el listado
export const ExpenseFilterSchema = z.object({
  categoryId: z.uuid().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

// Esquema para las estadísticas de gastos por categoría
export const CategoryStatSchema = z.object({
  categoryName: z.string(),
  categoryColor: z.string(),
  amountSpent: z.number(),
  monthlyBudget: z.number(),
  percentage: z.number(),
  isOverBudget: z.boolean(),
});

// Esquema para el reporte mensual de gastos
export const MonthlyReportSchema = z.object({
  month: z.number(),
  year: z.number(),
  totalSpent: z.number(),
  totalBudget: z.number(),
  averageSpend: z.number(),
  details: z.array(CategoryStatSchema),
});

// Tipos TypeScript inferidos a partir de los esquemas Zod
export type Expense = z.infer<typeof ExpenseSchema>;
export type CreateExpenseFormData = z.infer<typeof CreateExpenseSchema>;
export type UpdateExpenseFormData = z.infer<typeof UpdateExpenseSchema>;
export type ExpenseFilter = z.infer<typeof ExpenseFilterSchema>;
export type CategoryStat = z.infer<typeof CategoryStatSchema>;
export type MonthlyReport = z.infer<typeof MonthlyReportSchema>;
