using Expenses.DAL.Contracts;
using Expenses.DAL.Repositories.Base;
using Expenses.Entities.Models;

namespace Expenses.DAL.Repositories;

public class CategoryRepository : JsonBaseRepo<Category>, ICategoryRepository
{
    // Constructor que recibe la ruta del archivo JSON y la pasa al constructor base
    public CategoryRepository(string filePath)
        : base(filePath) { }

    // Implementacion de los metodos del contrato ICategoryRepository usando los metodos genericos del JsonBaseRepo

    // Obtener todas las categorias
    public async Task<IEnumerable<Category>> GetAllAsync() => await LoadAsync();

    // Obtener una categoria por su Id
    public async Task<Category?> GetByIdAsync(Guid id) => await FindAsync(c => c.Id == id);

    // Agregar una nueva categoria
    public async Task AddAsync(Category category) => await AppendAsync(category);

    // Actualizar una categoria existente por su Id
    public async Task UpdateAsync(Category category) =>
        await base.UpdateAsync(c => c.Id == category.Id, category);

    // Eliminar una categoria por su Id
    public async Task DeleteAsync(Guid id) => await base.DeleteAsync(c => c.Id == id);

    // Metodo para verificar si existe una categoria con un nombre dado (ignorando mayusculas/minusculas)
    public async Task<bool> ExistsByNameAsync(string name)
    {
        // Cargamos todas las categorias
        var items = await LoadAsync();

        // Verificamos si existe alguna categoria cuyo nombre coincida con el dado (ignorando mayusculas/minusculas)
        return items.Any(c => c.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }
}
