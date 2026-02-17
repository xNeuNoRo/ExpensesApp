using Expenses.Entities.Models;

namespace Expenses.DAL.Contracts;

public interface IExpenseRepository
{
    // Operaciones CRUD para la entidad Expense
    Task<IEnumerable<Expense>> GetAllAsync(); // IEnumerable para retornar una lista de solo lectura
    Task<Expense?> GetByIdAsync(Guid id);
    Task AddAsync(Expense expense);
    Task UpdateAsync(Expense expense);
    Task DeleteAsync(Guid id);

    // Metodos adicionales
    Task<IEnumerable<Expense>> GetByFilterAsync(ExpenseFilter filter); // IEnumerable para retornar una lista de solo lectura
    Task<bool> HasExpensesByCategoryAsync(Guid categoryId);
}
