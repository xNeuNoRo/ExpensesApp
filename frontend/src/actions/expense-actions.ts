"use server";

import {
  createExpense,
  updateExpense,
  deleteExpense,
  ExpensesAPIType,
  exportMonthlyReport,
} from "@/api/ExpensesAPI";
import { CreateExpenseFormData, Expense } from "@/schemas/expense";
import { revalidatePath } from "next/cache";

// Estas funciones son los Server Actions de Next.js que se encargaran de lo relacionado con escritura en la API para los gastos

// Crear un gasto
export async function createExpenseAction(
  data: CreateExpenseFormData,
): Promise<Expense> {
  // Llamamos a la función de la API para crear un nuevo gasto con los datos proporcionados
  const expense = await createExpense(data);
  // Después de crear el gasto, revalidamos la página principal para mostrar el nuevo gasto en la lista
  revalidatePath("/");
  // Retornamos el nuevo gasto creado para que pueda ser usado en la interfaz si es necesario
  return expense;
}

// Actualizar un gasto
export async function updateExpenseAction(
  data: ExpensesAPIType["UpdateExpenseFormData"],
) {
  // Llamamos a la función de la API para actualizar el gasto con los datos proporcionados
  await updateExpense(data);
  // Después de actualizar el gasto, revalidamos la página principal para mostrar los cambios en la lista
  revalidatePath("/");
}

// Eliminar un gasto
export async function deleteExpenseAction(id: string) {
  // Llamamos a la función de la API para eliminar el gasto con el ID proporcionado
  await deleteExpense(id);
  // Después de eliminar el gasto, revalidamos la página principal para actualizar la lista y eliminar el gasto eliminado
  revalidatePath("/");
}

// Exportar el reporte mensual de gastos
export async function exportReportAction(month: number, year: number) {
  // Llamamos a la función de la API para exportar el reporte mensual de gastos con el mes y año proporcionados
  const fileName = await exportMonthlyReport({ month, year });
  // Retornamos el nombre del archivo generado para informar al usuario
  return fileName;
}
