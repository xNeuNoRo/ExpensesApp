import { handleApiError } from "@/helpers/handleApiError";
import { validateApiRes } from "@/helpers/validateApiRes";
import { api } from "@/lib/axios";
import {
  CategoriesLookupSchema,
  CategoriesSchema,
  Category,
  CategoryLookup,
  CategorySchema,
  CreateCategoryFormData,
  UpdateCategoryFormData,
  ValidateCategorySchema,
} from "@/schemas/category";

export type CategoriesAPIType = {
  UpdateCategoryFormData: UpdateCategoryFormData & { id: Category["id"] };
};

/**
 * @description Crea una nueva categoría de gastos usando los datos proporcionados. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param categoryData Los datos necesarios para crear una categoría, incluyendo nombre, presupuesto mensual, icono y color. El nombre es obligatorio, el presupuesto debe ser positivo, y el icono y color son opcionales.
 * @returns {Promise<Category>} El objeto de categoría creado, con su ID generado por el backend. Si la creación es exitosa, se retorna el nuevo objeto de categoría. Si ocurre un error, se lanza una excepción con un mensaje específico del error.
 */
export async function createCategory(
  categoryData: CreateCategoryFormData,
): Promise<Category> {
  try {
    // Hacemos la petición a la API para crear una nueva categoría con los datos proporcionados
    const { data } = await api.post("/categories", categoryData);
    // Validamos la respuesta de la API usando el esquema de categoría
    return validateApiRes(data, CategorySchema);
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene la lista de categorías de gastos.
 * @returns {Promise<Category[]>} Un array de objetos de categoría.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    // Hacemos la petición a la API para obtener las categorías
    const { data } = await api.get("/categories");
    // Validamos la respuesta de la API usando el esquema de categorías
    const categories = validateApiRes(data, CategoriesSchema);
    // Si la validación es exitosa, retornamos las categorías
    return categories;
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene un lookup de categorías, que incluye solo el ID y el nombre de cada categoría. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @returns {Promise<CategoryLookup[]>} Un array de objetos que contienen el ID y el nombre de cada categoría. Si la consulta es exitosa, se retorna el array de categorías. Si ocurre un error, se lanza una excepción con un mensaje específico del error.
 */
export async function lookupCategories(): Promise<CategoryLookup[]> {
  try {
    // Hacemos la petición a la API para obtener el lookup de categorías
    const { data } = await api.get("/categories/lookup");
    // Validamos la respuesta de la API usando el esquema de lookup de categorías
    const categories = validateApiRes(data, CategoriesLookupSchema);
    // Si la validación es exitosa, retornamos el lookup de categorías
    return categories;
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene los detalles de una categoría específica por su ID. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param id El ID de la categoría que se desea obtener. Debe ser un UUID válido.
 * @returns {Promise<Category>} El objeto de categoría correspondiente al ID proporcionado. Si la consulta es exitosa, se retorna el objeto de categoría. Si ocurre un error, se lanza una excepción con un mensaje específico del error.
 */
export async function getCategoryById(id: Category["id"]): Promise<Category> {
  try {
    // Hacemos la petición a la API para obtener los detalles de la categoría con el ID proporcionado
    const { data } = await api.get(`/categories/${id}`);
    // Validamos la respuesta de la API usando el esquema de categoría
    return validateApiRes(data, CategorySchema);
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene los detalles de una categoría específica por su nombre. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param name El nombre de la categoría que se desea obtener. Debe ser una cadena de texto no vacía.
 * @returns {Promise<Category>} El objeto de categoría correspondiente al nombre proporcionado. Si la consulta es exitosa, se retorna el objeto de categoría. Si ocurre un error, se lanza una excepción con un mensaje específico del error.
 */
export async function getCategoryByName(
  name: Category["name"],
): Promise<Category> {
  try {
    // Hacemos la petición a la API para obtener los detalles de la categoría con el nombre proporcionado
    const { data } = await api.get(`/categories/name/${name}`);
    // Validamos la respuesta de la API usando el esquema de categoría
    return validateApiRes(data, CategorySchema);
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Actualiza una categoría de gastos existente usando los datos proporcionados. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param categoryData Los datos necesarios para actualizar una categoría, incluyendo su ID, nombre, presupuesto mensual, icono y color. El ID es obligatorio para identificar la categoría a actualizar, el nombre es obligatorio, el presupuesto debe ser positivo, y el icono y color son opcionales.
 * @returns {Promise<void>} No retorna ningún valor si la actualización es exitosa. Si ocurre un error, se lanza una excepción con un mensaje específico del error.
 */
export async function updateCategory(
  categoryData: CategoriesAPIType["UpdateCategoryFormData"],
): Promise<void> {
  try {
    // Hacemos la petición a la API para actualizar la categoría con los datos proporcionados
    await api.put(`/categories/${categoryData.id}`, categoryData);
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Elimina una categoría de gastos por su ID. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param id El ID de la categoría que se desea eliminar. Debe ser un UUID válido.
 * @returns {Promise<void>} No retorna ningún valor si la eliminación es exitosa. Si ocurre un error, se lanza una excepción con un mensaje específico del error.
 */
export async function deleteCategory(id: Category["id"]): Promise<void> {
  try {
    // Hacemos la petición a la API para eliminar la categoría con el ID proporcionado
    await api.delete(`/categories/${id}`);
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Valida si un nombre de categoría está disponible para ser usado. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param name El nombre de la categoría que se desea validar. Debe ser una cadena de texto no vacía.
 * @returns {Promise<boolean>} Un valor booleano que indica si el nombre de categoría está disponible (true) o no (false). Si la validación es exitosa, se retorna el resultado de la validación. Si ocurre un error, se lanza una excepción con un mensaje específico del error.
 */
export async function validateCategoryName(
  name: Category["name"],
): Promise<boolean> {
  try {
    // Hacemos la petición a la API para validar si el nombre de categoría está disponible
    const { data } = await api.get(`/categories/validate-name/${name}`);
    // Validamos la respuesta de la API usando el esquema de validación de nombre de categoría
    const validationResult = validateApiRes(data, ValidateCategorySchema);
    // Si la validación es exitosa, retornamos el resultado de la validación
    return validationResult.available;
  } catch (err) {
    handleApiError(err);
  }
}
