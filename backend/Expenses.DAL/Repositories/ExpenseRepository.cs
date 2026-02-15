using Expenses.DAL.Contracts;
using Expenses.DAL.Repositories.Base;
using Expenses.Entities.Models;

namespace Expenses.DAL.Repositories;

public class ExpenseRepository : JsonBaseRepo<Expense>, IExpenseRepository
{
    // Constructor que recibe la ruta del archivo JSON y la pasa al constructor base
    public ExpenseRepository(string filePath)
        : base(filePath) { }

    // Implementacion de los metodos del contrato IExpenseRepository usando los metodos genericos del JsonBaseRepo

    // Obtener todos los gastos
    public async Task<IEnumerable<Expense>> GetAllAsync() => await LoadAsync();

    // Obtener un gasto por su Id
    public async Task<Expense?> GetByIdAsync(Guid id) => await FindAsync(e => e.Id == id);

    // Agregar un nuevo gasto
    public async Task AddAsync(Expense expense) => await AppendAsync(expense);

    // Actualizar un gasto existente por su Id
    public async Task UpdateAsync(Expense expense) =>
        await UpdateAsync(e => e.Id == expense.Id, expense);

    // Eliminar un gasto por su Id
    public async Task DeleteAsync(Guid id) => await DeleteAsync(e => e.Id == id);

    // Metodo para obtener gastos filtrados por categoria y/o rango de fechas
    public async Task<IEnumerable<Expense>> GetByFilterAsync(ExpenseFilter filter)
    {
        // Cargamos todos los gastos
        var expenses = await LoadAsync();
        // Convertimos la lista a IQueryable para poder aplicar filtros de forma flexible y eficiente con LINQ
        var query = expenses.AsQueryable();

        // Aplicamos filtros solo si vienen en el objeto filter (Filtro Flexible)

        // Filtro por categoria
        if (filter.CategoryId.HasValue)
        {
            query = query.Where(e => e.CategoryId == filter.CategoryId.Value);
        }

        // Filtro por fecha de inicio
        if (filter.StartDate.HasValue)
        {
            query = query.Where(e => e.Date >= filter.StartDate.Value);
        }

        // Filtro por fecha de fin
        if (filter.EndDate.HasValue)
        {
            query = query.Where(e => e.Date <= filter.EndDate.Value);
        }

        // Retornamos la lista filtrada (o incluso sin filtrar si no se aplico ningun filtro)
        return query.ToList();
    }

    // Metodo para verificar si existen gastos asociados a una categoria dada
    public async Task<bool> HasExpensesByCategoryAsync(Guid categoryId)
    {
        // Cargamos todos los gastos
        var expenses = await LoadAsync();

        // Verificamos si existe al menos un gasto que tenga el CategoryId igual al dado
        return expenses.Any(e => e.CategoryId == categoryId);
    }
}
