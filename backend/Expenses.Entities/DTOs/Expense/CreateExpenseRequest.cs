namespace Expenses.Entities.DTOs.Expense;

public record CreateExpenseRequest(
    string Description,
    decimal Amount,
    DateTime Date,
    Guid CategoryId
);
