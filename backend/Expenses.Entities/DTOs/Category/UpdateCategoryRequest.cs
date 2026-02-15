namespace Expenses.Entities.DTOs.Category;

public record UpdateCategoryRequest(
    string Name,
    decimal MonthlyBudget,
    string? IconKey,
    string? Color
);
