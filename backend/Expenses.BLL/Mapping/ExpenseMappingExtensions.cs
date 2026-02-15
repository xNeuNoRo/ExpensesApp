using Expenses.Entities.DTOs.Expense;
using Expenses.Entities.Models;

namespace Expenses.BLL.Mapping;

public static class ExpenseMappingExtensions
{
    // El mapeo de Expense a ExpenseResponseDto incluye el nombre y color de la categoria, para evitar que la BLL tenga que hacer una consulta adicional a la base de datos para obtener esa informacion
    public static ExpenseResponseDto ToDto(
        this Expense expense,
        string categoryName = "Sin Categoria",
        string categoryColor = "#000000"
    )
    {
        return new ExpenseResponseDto(
            expense.Id,
            expense.Name,
            expense.Description,
            expense.Amount,
            expense.Date,
            expense.CategoryId,
            categoryName,
            categoryColor
        );
    }

    // Este metodo se utilizara para convertir una lista de entidades Expense a una lista de DTOs ExpenseResponseDto, utilizando la informacion de las categorias para incluir el nombre y color en el DTO
    public static IEnumerable<ExpenseResponseDto> ToDtoList(
        this IEnumerable<Expense> expenses,
        IEnumerable<Category> categories
    )
    {
        return expenses.Select(e =>
        {
            // Buscamos la categoria correspondiente al gasto actual para obtener su nombre y color,
            // si no se encuentra la categoria se asignan valores por defecto
            var category = categories.FirstOrDefault(c => c.Id == e.CategoryId);

            // Utilizamos el metodo ToDto de Expense para convertir el gasto a un DTO,
            // pasando el nombre y color de la categoria (o valores por defecto si no se encuentra la categoria)
            return e.ToDto(category?.Name ?? "Sin Categoria", category?.Color ?? "#000000");
        });
    }

    // Este metodo se utilizara para crear un nuevo gasto a partir de los datos del CreateExpenseRequest
    public static Expense ToEntity(this CreateExpenseRequest request)
    {
        return new Expense(
            request.Name,
            request.Description,
            request.Amount,
            request.CategoryId,
            request.Date
        );
    }

    // Este metodo se utilizara para actualizar un gasto existente con los datos del UpdateExpenseRequest
    public static void UpdateFromRequest(this Expense expense, UpdateExpenseRequest request)
    {
        expense.Name = request.Name;
        expense.Description = request.Description;
        expense.Amount = request.Amount;
        expense.Date = request.Date;
        expense.CategoryId = request.CategoryId;
    }
}
