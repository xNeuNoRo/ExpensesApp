namespace Expenses.Entities.DTOs.Reports;

public record CategoryStatDto(
    string CategoryName,
    decimal AmountSpent,
    double Percentage,
    bool IsOverBudget
);
