namespace Expenses.Entities.DTOs.Expense;

public record UpdateExpenseRequest(
    string Description,
    decimal Amount,
    DateTime Date,
    Guid CategoryId
);
