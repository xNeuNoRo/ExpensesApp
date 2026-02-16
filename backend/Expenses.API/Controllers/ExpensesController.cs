using Expenses.API.Controllers.Base;
using Expenses.BLL.Contracts;
using Expenses.Entities.DTOs.Expense;
using Expenses.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers;

public class ExpensesController : BaseApiController
{
    private readonly IExpenseService _expenseService;

    // Inyectamos el servicio de gastos a través del constructor para poder utilizarlo en los endpoints.
    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    // Este endpoint es para obtener la lista de gastos filtrados por categoria y rango de fechas.
    [HttpGet]
    // Con [FromQuery] indicamos que el filtro se va a recibir a traves de los parametros de la query string,
    // Ej: /api/v1/expenses?categoryId=123&startDate=2024-01-01&endDate=2024-12-31
    public async Task<IActionResult> GetFiltered([FromQuery] ExpenseFilter filter)
    {
        // Obtenemos los gastos filtrados utilizando el servicio de gastos.
        var expenses = await _expenseService.GetExpensesAsync(filter);

        // Devolvemos la lista de gastos filtrados utilizando el método Success heredado de BaseApiController.
        return Success(expenses);
    }

    // Este endpoint es para obtener un resumen de los gastos filtrados,
    // en lugar de devolver la lista completa, devolvemos solo el total y el conteo de gastos.
    [HttpGet("summary")]
    // Con [FromQuery] indicamos que el filtro se va a recibir a traves de los parametros de la query string,
    // Ej: /api/v1/expenses?categoryId=123&startDate=2024-01-01&endDate=2024-12-31
    public async Task<IActionResult> GetFilteredSummary([FromQuery] ExpenseFilter filter)
    {
        // Obtenemos los gastos
        var expenses = await _expenseService.GetExpensesAsync(filter);
        // Calculamos el total y el conteo de gastos
        var total = expenses.Sum(e => e.Amount);
        var count = expenses.Count();

        // Devolvemos el resumen con total y conteo
        return Success(new { total, count });
    }

    // Este endpoint es para obtener un gasto por su ID.
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id) =>
        Success(await _expenseService.GetExpenseByIdAsync(id)); // Devolvemos el gasto encontrado utilizando el método Success heredado de BaseApiController.

    // Este endpoint es para obtener un reporte mensual de gastos, agrupados por categoria, para un mes y año específicos.
    [HttpGet("report/{year:int}/{month:int}")]
    public async Task<IActionResult> GetMonthlyReport(int year, int month)
    {
        // Obtenemos el reporte mensual utilizando el servicio de gastos.
        var report = await _expenseService.GetMonthlyReportAsync(month, year);

        // Devolvemos el reporte utilizando el método Success heredado de BaseApiController.
        return Success(report);
    }

    // Este endpoint es para crear un nuevo gasto.
    [HttpPost]
    public async Task<IActionResult> Create(CreateExpenseRequest request)
    {
        // Creamos el nuevo gasto utilizando el servicio de gastos.
        var result = await _expenseService.CreateExpenseAsync(request);

        // Devolvemos el gasto creado utilizando el método CreatedSuccess heredado de BaseApiController,
        // indicando que el recurso se ha creado correctamente, y proporcionando la ruta para obtener el gasto creado.
        return CreatedSuccess(nameof(GetById), new { id = result.Id }, result);
    }

    // Este endpoint es para actualizar un gasto existente por su ID.
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateExpenseRequest request)
    {
        // Actualizamos el gasto utilizando el servicio de gastos.
        await _expenseService.UpdateExpenseAsync(id, request);
        return NoContent(); // 204 No Content
    }

    // Este endpoint es para eliminar un gasto por su ID.
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        // Eliminamos el gasto utilizando el servicio de gastos.
        await _expenseService.DeleteExpenseAsync(id);
        return NoContent(); // 204 No Content
    }
}
