namespace Expenses.Entities.DTOs.Expense;

public record UpdateExpenseRequest(
    string Name,
    string Description,
    decimal Amount,
    DateTime Date,
    Guid CategoryId
);
