namespace Expenses.Entities.DTOs.Reports;

public record CategoryStatDto(
    string CategoryName,
    string CategoryColor,
    string CategoryIcon,
    decimal AmountSpent,
    decimal MonthlyBudget,
    double Percentage,
    bool IsOverBudget
);
