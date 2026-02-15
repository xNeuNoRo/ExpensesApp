namespace Expenses.Entities.DTOs.Category;

public record CategoryResponseDto(
    Guid Id,
    string Name,
    decimal MonthlyBudget,
    string IconKey,
    string Color
);
