namespace Expenses.Entities.DTOs.Expense;

public record ExpenseResponseDto(
    Guid Id,
    string Name,
    string Description,
    decimal Amount,
    DateTime Date,
    Guid CategoryId,
    string CategoryName,
    string CategoryColor,
    string CategoryIcon
);
