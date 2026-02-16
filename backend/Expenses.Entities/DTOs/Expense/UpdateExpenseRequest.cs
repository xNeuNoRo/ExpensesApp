using System.ComponentModel.DataAnnotations;

namespace Expenses.Entities.DTOs.Expense;

public record UpdateExpenseRequest(
    [Required(ErrorMessage = "El nombre del gasto es obligatorio.")] string Name,
    string Description,
    [Range(0.01, double.MaxValue, ErrorMessage = "El monto debe ser un valor positivo.")]
        decimal Amount,
    [Required] DateTime Date,
    [Required] Guid CategoryId
);
