namespace Expenses.Entities.Models;

// Esta clase se utiliza para filtrar los gastos por categoria y rango de fechas al obtener la lista de gastos (solo en memoria)
public class ExpenseFilter
{
    public Guid? CategoryId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
