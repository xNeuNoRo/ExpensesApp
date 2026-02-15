namespace Expenses.Entities.DTOs.Reports;

public record MonthlyReportDto(
    int Month,
    int Year,
    decimal TotalSpent,
    decimal TotalBudget,
    List<CategoryStatDto> Details
);
