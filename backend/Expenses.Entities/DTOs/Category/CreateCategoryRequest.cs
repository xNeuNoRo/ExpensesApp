namespace Expenses.Entities.DTOs.Category;

public record CreateCategoryRequest(
    string Name,
    decimal MonthlyBudget,
    string? IconKey,
    string? Color
);
