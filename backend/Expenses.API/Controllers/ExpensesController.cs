using Expenses.API.Controllers.Base;
using Expenses.BLL.Contracts;
using Expenses.Entities.DTOs.Expense;
using Expenses.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers;

public class ExpensesController : BaseApiController
{
    private readonly IExpenseService _expenseService;

    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpGet]
    // Con [FromQuery] indicamos que el filtro se va a recibir a traves de los parametros de la query string,
    // Ej: /api/v1/expenses?categoryId=123&startDate=2024-01-01&endDate=2024-12-31
    public async Task<IActionResult> GetFiltered([FromQuery] ExpenseFilter filter)
    {
        var expenses = await _expenseService.GetExpensesAsync(filter);
        return Success(expenses);
    }

    [HttpGet("summary")]
    // Con [FromQuery] indicamos que el filtro se va a recibir a traves de los parametros de la query string,
    // Ej: /api/v1/expenses?categoryId=123&startDate=2024-01-01&endDate=2024-12-31
    public async Task<IActionResult> GetFilteredSummary([FromQuery] ExpenseFilter filter)
    {
        // Este
        var expenses = await _expenseService.GetExpensesAsync(filter);
        var total = expenses.Sum(e => e.Amount);
        var count = expenses.Count();

        return Success(new { total, count });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id) =>
        Success(await _expenseService.GetExpenseByIdAsync(id));

    [HttpGet("report/{year:int}/{month:int}")]
    public async Task<IActionResult> GetMonthlyReport(int year, int month)
    {
        var report = await _expenseService.GetMonthlyReportAsync(month, year);
        return Success(report);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateExpenseRequest request)
    {
        var result = await _expenseService.CreateExpenseAsync(request);
        return CreatedSuccess(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateExpenseRequest request)
    {
        await _expenseService.UpdateExpenseAsync(id, request);
        return NoContent(); // 204 No Content
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _expenseService.DeleteExpenseAsync(id);
        return NoContent(); // 204 No Content
    }
}
