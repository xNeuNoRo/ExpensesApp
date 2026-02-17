import { handleApiError } from "@/helpers/handleApiError";
import { validateApiRes } from "@/helpers/validateApiRes";
import { api } from "@/lib/axios";
import {
  CreateExpenseFormData,
  Expense,
  ExpenseFilter,
  ExpenseSchema,
  ExpensesSchema,
  ExpenseSummary,
  ExpenseSummarySchema,
  ExportMonthlyReportResponseSchema,
  MonthlyReport,
  MonthlyReportSchema,
  UpdateExpenseFormData,
} from "@/schemas/expense";

export type ExpensesAPIType = {
  UpdateExpenseFormData: UpdateExpenseFormData & { id: string };
  date: Pick<MonthlyReport, "month" | "year">;
};

/**
 * @description Crea un nuevo gasto utilizando los datos proporcionados. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param expenseData Los datos del gasto a crear, que deben cumplir con el esquema de CreateExpenseFormData. Esto incluye el nombre, descripción, monto, fecha y categoría del gasto. El monto debe ser un número positivo y la fecha debe ser una cadena en formato ISO o compatible con el input de tipo date de HTML. La categoría debe ser un UUID válido que corresponda a una categoría existente.
 * @returns El gasto creado, con todos sus campos incluyendo el ID generado por el backend. El objeto retornado cumple con el esquema de Expense, que incluye el ID, nombre, descripción, monto, fecha, categoríaId y opcionalmente el nombre de la categoría.
 */
export async function createExpense(
  expenseData: CreateExpenseFormData,
): Promise<Expense> {
  try {
    // Hacemos la petición a la API para crear un nuevo gasto con los datos proporcionados
    const { data } = await api.post("/expenses", expenseData);
    // Validamos la respuesta de la API usando el esquema de gasto
    const expense = validateApiRes(data, ExpenseSchema);
    // Si la validación es exitosa, retornamos el nuevo gasto creado
    return expense;
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene un listado de gastos desde la API, aplicando los filtros proporcionados. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param filters Un objeto que contiene los filtros a aplicar para obtener el listado de gastos. Esto puede incluir categoryId (UUID de la categoría), startDate (fecha de inicio en formato ISO o compatible con input date de HTML) y endDate (fecha de fin en formato ISO o compatible con input date de HTML). Estos filtros son opcionales, pero si se proporcionan deben cumplir con los formatos esperados. El listado de gastos retornado incluirá todos los gastos que coincidan con los filtros aplicados, cada uno cumpliendo con el esquema de Expense. Si la API responde con un error, se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 * @returns {Promise<Expense[]>} Un array de gastos que cumplen con el esquema de Expense, filtrados según los criterios proporcionados. Cada gasto incluye su ID, nombre, descripción, monto, fecha, categoríaId y opcionalmente el nombre de la categoría. Si la API responde con un error, se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 */
export async function getExpenses(filters?: ExpenseFilter): Promise<Expense[]> {
  try {
    // Hacemos la petición a la API para obtener el listado de gastos
    const { data } = await api.get("/expenses", { params: filters });
    // Validamos la respuesta de la API usando el esquema de array de gastos
    const expenses = validateApiRes(data, ExpensesSchema);
    // Si la validación es exitosa, retornamos el listado de gastos
    return expenses;
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene un gasto por su ID desde la API. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param id El ID del gasto que se desea obtener. Debe ser un UUID válido que corresponda a un gasto existente en el backend.
 * @returns {Promise<Expense>} El gasto obtenido, que cumple con el esquema de Expense. Esto incluye el ID, nombre, descripción, monto, fecha, categoríaId y opcionalmente el nombre de la categoría del gasto. Si la API responde con un error (por ejemplo, si no se encuentra un gasto con el ID proporcionado), se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 */
export async function getExpenseById(id: Expense["id"]): Promise<Expense> {
  try {
    // Hacemos la petición a la API para obtener el gasto por su ID
    const { data } = await api.get(`/expenses/${id}`);
    // Validamos la respuesta de la API usando el esquema de gasto
    const expense = validateApiRes(data, ExpenseSchema);
    // Si la validación es exitosa, retornamos el gasto obtenido
    return expense;
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene el resumen de gastos desde la API, aplicando los filtros proporcionados. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param filters Un objeto que contiene los filtros a aplicar para obtener el resumen de gastos. Esto puede incluir categoryId (UUID de la categoría), startDate (fecha de inicio en formato ISO o compatible con input date de HTML) y endDate (fecha de fin en formato ISO o compatible con input date de HTML). Estos filtros son opcionales, pero si se proporcionan deben cumplir con los formatos esperados. El resumen de gastos retornado incluirá el monto total gastado, la cantidad total de gastos, el monto promedio por gasto y otros datos relevantes según el esquema de ExpenseSummary. Si la API responde con un error, se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 * @returns {Promise<ExpenseSummary>} Un objeto que contiene el resumen de gastos, cumpliendo con el esquema de ExpenseSummary. Esto incluye el monto total gastado, la cantidad total de gastos, el monto promedio por gasto y otros datos relevantes. Si la API responde con un error, se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 */
export async function getExpensesSummary(
  filters: ExpenseFilter,
): Promise<ExpenseSummary> {
  try {
    // Hacemos la petición a la API para obtener el resumen de gastos con los filtros proporcionados
    const { data } = await api.get("/expenses/summary", { params: filters });
    // Validamos la respuesta de la API usando el esquema de resumen de gastos
    const summary = validateApiRes(data, ExpenseSummarySchema);
    // Si la validación es exitosa, retornamos el resumen de gastos
    return summary;
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Obtiene el reporte mensual de gastos desde la API para un mes y año específicos. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param date Un objeto que contiene el mes y año para los cuales se desea obtener el reporte mensual de gastos. El mes debe ser un número entre 1 y 12, y el año debe ser un número de cuatro dígitos (por ejemplo, 2024). El reporte mensual de gastos retornado incluirá el total gastado en ese mes, el porcentaje del presupuesto utilizado, las categorías con sus respectivos gastos y otros datos relevantes según el esquema de MonthlyReport. Si la API responde con un error (por ejemplo, si no hay datos disponibles para el mes y año proporcionados), se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 * @returns {Promise<MonthlyReport>} Un objeto que contiene el reporte mensual de gastos, cumpliendo con el esquema de MonthlyReport. Esto incluye el total gastado en ese mes, el porcentaje del presupuesto utilizado, las categorías con sus respectivos gastos y otros datos relevantes. Si la API responde con un error, se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 */
export async function getMonthlyReport(
  date: ExpensesAPIType["date"],
): Promise<MonthlyReport> {
  try {
    // Hacemos la petición a la API para obtener el reporte mensual de gastos con los filtros proporcionados
    const { data } = await api.get(
      `/expenses/report/${date.year}/${date.month}`,
    );
    // Validamos la respuesta de la API usando el esquema de reporte mensual de gastos
    const report = validateApiRes(data, MonthlyReportSchema);
    // Si la validación es exitosa, retornamos el reporte mensual de gastos
    return report;
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Actualiza un gasto existente utilizando los datos proporcionados. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param expenseData Los datos del gasto a actualizar, que deben cumplir con el esquema de UpdateExpenseFormData y además incluir el ID del gasto a actualizar. Esto incluye el nombre, descripción, monto, fecha y categoría del gasto. El monto debe ser un número positivo y la fecha debe ser una cadena en formato ISO o compatible con el input de tipo date de HTML. La categoría debe ser un UUID válido que corresponda a una categoría existente. El ID debe ser un UUID válido que corresponda a un gasto existente en el backend.
 * @returns void Si la actualización es exitosa, la función no retorna ningún valor. Si la API responde con un error (por ejemplo, si no se encuentra un gasto con el ID proporcionado o si los datos de actualización son inválidos), se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 */
export async function updateExpense(
  expenseData: ExpensesAPIType["UpdateExpenseFormData"],
): Promise<void> {
  try {
    // Hacemos la petición a la API para actualizar el gasto con los datos proporcionados
    await api.put(`/expenses/${expenseData.id}`, expenseData);
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Elimina un gasto por su ID. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param id El ID del gasto que se desea eliminar. Debe ser un UUID válido que corresponda a un gasto existente en el backend.
 * @returns void Si la eliminación es exitosa, la función no retorna ningún valor. Si la API responde con un error (por ejemplo, si no se encuentra un gasto con el ID proporcionado), se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 */
export async function deleteExpense(id: Expense["id"]): Promise<void> {
  try {
    // Hacemos la petición a la API para eliminar el gasto con el ID proporcionado
    await api.delete(`/expenses/${id}`);
  } catch (err) {
    handleApiError(err);
  }
}

/**
 * @description Exporta el reporte mensual de gastos para un mes y año específicos. Lanza errores específicos si la API responde con un error o si ocurre un error de red.
 * @param date Un objeto que contiene el mes y año para los cuales se desea exportar el reporte mensual de gastos. El mes debe ser un número entre 1 y 12, y el año debe ser un número de cuatro dígitos (por ejemplo, 2024). Si la exportación es exitosa, se retornará el nombre del archivo exportado. Si la API responde con un error (por ejemplo, si no hay datos disponibles para el mes y año proporcionados), se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 * @returns {Promise<string>} El nombre del archivo exportado que contiene el reporte mensual de gastos. Si la API responde con un error, se lanzará un error con el mensaje específico proporcionado por la API. Si ocurre un error de red u otro tipo de error, se lanzará ese error para que sea manejado por el componente que llamó a esta función.
 */
export async function exportMonthlyReport(
  date: ExpensesAPIType["date"],
): Promise<string> {
  try {
    // Hacemos la petición a la API para exportar el reporte mensual de gastos con los filtros proporcionados
    const { data } = await api.post(
      `/expenses/report/${date.year}/${date.month}/export`,
    );
    // Validamos la respuesta de la API usando el esquema de reporte mensual de gastos
    const res = validateApiRes(data, ExportMonthlyReportResponseSchema);
    // Si la validación es exitosa, retornamos el nombre del archivo exportado
    return res.fileName;
  } catch (err) {
    handleApiError(err);
  }
}
