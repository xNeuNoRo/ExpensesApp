using System.ComponentModel.DataAnnotations;

namespace Expenses.Entities.DTOs.Category;

public record UpdateCategoryRequest(
    [Required(ErrorMessage = "El nombre de la categoría es obligatorio.")] string Name,
    [Range(0, double.MaxValue, ErrorMessage = "El presupuesto mensual no puede ser negativo.")]
        decimal MonthlyBudget,
    string? IconKey,
    string? Color
);
