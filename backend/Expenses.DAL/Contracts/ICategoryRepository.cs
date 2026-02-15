using Expenses.Entities.Models;

namespace Expenses.DAL.Contracts;

public interface ICategoryRepository
{
    // Operaciones CRUD para la entidad Category
    Task<IEnumerable<Category>> GetAllAsync(); // IEnumerable para retornar una lista de solo lectura
    Task<Category?> GetByIdAsync(Guid id);
    Task AddAsync(Category category);
    Task UpdateAsync(Category category);
    Task DeleteAsync(Guid id);

    // Metodos adicionales
    Task<bool> ExistsByNameAsync(string name);
}
