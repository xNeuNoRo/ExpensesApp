using Expenses.Entities.DTOs.Category;
using Expenses.Entities.Models;

namespace Expenses.BLL.Mapping;

// Usando extension methods para mapear entre entidades y DTOs, esto hace que el codigo sea mas limpio y facil de mantener, ademas de separar las responsabilidades de mapeo en una clase dedicada
public static class CategoryMappingExtensions
{
    // Este metodo se utilizara para convertir una entidad Category a un DTO CategoryResponseDto
    public static CategoryResponseDto ToDto(this Category category)
    {
        return new CategoryResponseDto(
            category.Id,
            category.Name,
            category.MonthlyBudget,
            category.IconKey,
            category.Color
        );
    }

    // Este metodo se utilizara para convertir una lista de entidades Category a una lista de DTOs CategoryResponseDto
    public static IEnumerable<CategoryResponseDto> ToDtoList(this IEnumerable<Category> categories)
    {
        return categories.Select(c => c.ToDto());
    }

    // Este metodo se utilizara para crear una nueva categoria a partir de los datos del CreateCategoryRequest
    public static Category ToEntity(this CreateCategoryRequest request)
    {
        return new Category(request.Name, request.MonthlyBudget, request.IconKey, request.Color);
    }

    // Este metodo se utilizara para actualizar una categoria existente con los datos del UpdateCategoryRequest
    public static void UpdateFromRequest(this Category category, UpdateCategoryRequest request)
    {
        category.Name = request.Name;
        category.MonthlyBudget = request.MonthlyBudget;
        category.IconKey = request.IconKey ?? category.IconKey; // Si no se proporciona un nuevo icono, se mantiene el existente
        category.Color = request.Color ?? category.Color; // Si no se proporciona un nuevo color, se mantiene el existente
    }
}
