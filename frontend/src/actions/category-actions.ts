"use server";

import {
  createCategory,
  updateCategory,
  deleteCategory,
  CategoriesAPIType,
} from "@/api/CategoriesAPI";
import { Category, CreateCategoryFormData } from "@/schemas/category";
import { revalidatePath } from "next/cache";

// Todas estas funciones son los Server Actions de Next.js que se encargaran de lo relacionado con escritura en la API

// Crear una categoria de gastos
export async function createCategoryAction(
  data: CreateCategoryFormData,
): Promise<Category> {
  // Llamamos a la función de la API para crear una nueva categoría con los datos proporcionados
  const category = await createCategory(data);
  // Después de crear la categoría, revalidamos la página principal para mostrar la nueva categoría en la lista
  revalidatePath("/");
  // Retornamos la nueva categoría creada para que pueda ser usada en la interfaz si es necesario
  return category;
}

// Actualizar una categoria de gastos
export async function updateCategoryAction(
  data: CategoriesAPIType["UpdateCategoryFormData"],
) {
  // Llamamos a la función de la API para actualizar la categoría con los datos proporcionados
  await updateCategory(data);
  // Después de actualizar la categoría, revalidamos la página principal para mostrar los cambios en la lista
  revalidatePath("/");
}

// Eliminar una categoria de gastos
export async function deleteCategoryAction(id: string) {
  // Llamamos a la función de la API para eliminar la categoría con el ID proporcionado
  await deleteCategory(id);
  // Después de eliminar la categoría, revalidamos la página principal para actualizar la lista y eliminar la categoría eliminada
  revalidatePath("/");
}
