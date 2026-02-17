using Expenses.Entities.DTOs.Expense;
using Expenses.Entities.DTOs.Reports;
using Expenses.Entities.Models;

namespace Expenses.BLL.Contracts;

public interface IExpenseService
{
    Task<IEnumerable<ExpenseResponseDto>> GetExpensesAsync(ExpenseFilter filter);
    Task<ExpenseResponseDto> GetExpenseByIdAsync(Guid id);
    Task<ExpenseResponseDto> CreateExpenseAsync(CreateExpenseRequest request);
    Task UpdateExpenseAsync(Guid id, UpdateExpenseRequest request);
    Task DeleteExpenseAsync(Guid id);
    Task<bool> HasExpensesInCategoryAsync(Guid categoryId);
    Task<MonthlyReportDto> GetMonthlyReportAsync(int month, int year);
    Task<string> ExportMonthlyReportAsync(int month, int year);
}
