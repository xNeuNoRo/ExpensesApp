namespace Expenses.Entities.Models.Reports;

// Esta clase representa el resumen de gastos por categoria para un mes especifico (solo en memoria)
public class CategorySummary
{
    public string CategoryName { get; set; } = string.Empty;
    public decimal TotalSpent { get; set; }
    public double Percentage { get; set; }
    public decimal Budget { get; set; }
    public bool IsOverBudget { get; set; }
}
