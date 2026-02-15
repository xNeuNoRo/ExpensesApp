namespace Expenses.Entities.Models.Reports;

// Esta clase representa el resumen mensual de gastos, incluyendo el total gastado y el gasto por categoria (solo en memoria)
public class MonthlySummary
{
    public int Month { get; init; }
    public int Year { get; init; }
    public decimal TotalAmount { get; set; }
    public List<CategorySummary> Categories { get; set; } = new();
}
