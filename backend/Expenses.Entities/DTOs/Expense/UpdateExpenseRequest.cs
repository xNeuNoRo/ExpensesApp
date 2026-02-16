using System.ComponentModel.DataAnnotations;

namespace Expenses.Entities.DTOs.Expense;

public record UpdateExpenseRequest(
    [Required(ErrorMessage = "El nombre del gasto es obligatorio.")] string Name,
    [Required(ErrorMessage = "La descripción del gasto es obligatoria.")] string Description,
    [Required(ErrorMessage = "El monto es obligatorio.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "El monto debe ser un valor positivo.")]
        decimal Amount,
    [Required(ErrorMessage = "La fecha es obligatoria.")]
    [Range(
        typeof(DateTime), // Especificamos que el rango es para un tipo DateTime
        "1970-01-01",
        "3000-12-31",
        ErrorMessage = "La fecha debe ser válida (año 1970 <= fecha <= año 3000)."
    )]
        DateTime Date,
    [Required(ErrorMessage = "La categoría es obligatoria.")] Guid? CategoryId
);
