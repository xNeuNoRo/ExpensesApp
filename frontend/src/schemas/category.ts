import { z } from "zod";

// Esquema para una categoría de gastos
export const CategorySchema = z.object({
  id: z.uuid("El ID debe ser un UUID válido."),
  name: z.string(),
  monthlyBudget: z.number(),
  iconKey: z.string().nullable(),
  color: z.string().nullable(),
});

// Esquema para un array de categorías
export const CategoriesSchema = z.array(CategorySchema);

// Esquema para el lookup de categorías (solo id y name)
export const CategoryLookupSchema = CategorySchema.pick({
  id: true,
  name: true,
});

// Esquema para un array de lookups de categorías
export const CategoriesLookupSchema = z.array(CategoryLookupSchema);

// Esquema para crear una nueva categoría de gastos
export const CreateCategorySchema = z.object({
  name: z.string().min(1, "El nombre de la categoría es obligatorio."),
  monthlyBudget: z
    .number()
    .positive("El presupuesto debe ser un valor positivo."),
  iconKey: z.string().optional(),
  color: z.string().optional(),
});

// Esquema para actualizar una categoría de gastos (es lo mismo que el de creacion)
export const UpdateCategorySchema = CategorySchema;

// Esquema para validar si un nombre de categoría está disponible
export const ValidateCategorySchema = z.object({
  available: z.boolean(),
});

// Tipos TypeScript inferidos a partir de los esquemas Zod
export type Category = z.infer<typeof CategorySchema>;
export type CategoryLookup = z.infer<typeof CategoryLookupSchema>;
export type ValidCategoryNameResponse = z.infer<typeof ValidateCategorySchema>;
export type CreateCategoryFormData = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof UpdateCategorySchema>;
