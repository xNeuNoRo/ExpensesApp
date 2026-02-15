namespace Expenses.Entities.DTOs.Expense;

public record CreateExpenseRequest(
    string Name,
    string Description,
    decimal Amount,
    DateTime Date,
    Guid CategoryId
);
