using Expenses.BLL.Contracts;
using Expenses.BLL.Mapping;
using Expenses.DAL.Contracts;
using Expenses.Entities.DTOs.Category;
using Expenses.Entities.Exceptions;

namespace Expenses.BLL.Services;

public class CategoryService : ICategoryService
{
    private readonly IExpenseRepository _expenseRepository;
    private readonly ICategoryRepository _categoryRepository;

    // Constructor para inyectar el repo de categorias
    public CategoryService(
        ICategoryRepository categoryRepository,
        IExpenseRepository expenseRepository
    )
    {
        _expenseRepository = expenseRepository;
        _categoryRepository = categoryRepository;
    }

    // Obtenemos todas las categorias de la base de datos y las convertimos a DTOs para devolverlas al cliente
    public async Task<IEnumerable<CategoryResponseDto>> GetCategoriesAsync()
    {
        // Obtenemos todas las categorias de la base de datos (JSON)
        var categories = await _categoryRepository.GetAllAsync();
        // Convertimos las categorias a DTOs utilizando el metodo de extension ToDtoList() definido en CategoryMappingExtensions
        return categories.ToDtoList();
    }

    // Obtenemos una categoria por su ID de la base de datos y la convertimos a DTO para devolverla al cliente
    public async Task<CategoryResponseDto> GetCategoryByIdAsync(Guid id)
    {
        // Obtenemos la categoria por su ID de la base de datos (JSON)
        var category = await _categoryRepository.GetByIdAsync(id);

        // Si la categoria no existe, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
        if (category == null)
        {
            throw AppException.NotFound(
                "No se encontro la categoria especificada.",
                ErrorCodes.CategoryNotFound
            );
        }

        // Convertimos la categoria a DTO utilizando el metodo de extension ToDto() definido en CategoryMappingExtensions
        return category.ToDto();
    }

    // Metodo para crear una nueva categoria, con sus respectivas validaciones, y devolver la categoria creada como DTO al cliente
    public async Task<CategoryResponseDto> CreateCategoryAsync(CreateCategoryRequest request)
    {
        // Validamos que no exista una categoria con el mismo nombre antes de crearla
        if (await _categoryRepository.ExistsByNameAsync(request.Name))
        {
            // Si ya existe una categoria con el mismo nombre, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
            throw AppException.Conflict(
                "Ya existe una categoria con el mismo nombre.",
                ErrorCodes.DuplicateCategory
            );
        }

        // Pasamos la categoria del DTO a entidad
        var category = request.ToEntity();
        // Guardamos la categoria en la base de datos (JSON)
        await _categoryRepository.AddAsync(category);

        // Convertimos la categoria a DTO utilizando el metodo de extension ToDto() definido en CategoryMappingExtensions
        return category.ToDto();
    }

    // Metodo para actualizar una categoria existente por su ID, con sus respectivas validaciones, y devolver la categoria actualizada como DTO al cliente
    public async Task UpdateCategoryAsync(Guid id, UpdateCategoryRequest request)
    {
        // Intentamos obtener la categoria por su id
        var category = await _categoryRepository.GetByIdAsync(id);

        // Si la categoria no existe, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
        if (category == null)
        {
            throw AppException.NotFound(
                "No se encontro la categoria especificada.",
                ErrorCodes.CategoryNotFound
            );
        }

        // Validamos que no exista otra categoria con el mismo nombre antes de actualizarla, ignorando la categoria actual
        if (
            !category.Name.Equals(request.Name, StringComparison.OrdinalIgnoreCase)
            && await _categoryRepository.ExistsByNameAsync(request.Name)
        )
        {
            throw AppException.Conflict(
                "Ya existe una categoria con el mismo nombre.",
                ErrorCodes.DuplicateCategory
            );
        }

        // Actualizamos la categoria con los datos del DTO utilizando el metodo de extension UpdateFromRequest() definido en CategoryMappingExtensions
        category.UpdateFromRequest(request);

        // Guardamos los cambios en la base de datos (JSON)
        await _categoryRepository.UpdateAsync(category);
    }

    // Metodo para eliminar una categoria por su ID, con sus respectivas validaciones
    public async Task DeleteCategoryAsync(Guid id)
    {
        // Intentamos obtener la categoria por su id
        var category = await _categoryRepository.GetByIdAsync(id);

        // Si la categoria no existe, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
        if (category == null)
        {
            throw AppException.NotFound(
                "No se encontro la categoria especificada.",
                ErrorCodes.CategoryNotFound
            );
        }

        // Validamos que no existan gastos asociados a la categoria antes de eliminarla
        if (await _expenseRepository.HasExpensesByCategoryAsync(id))
        {
            // Si existen gastos asociados a la categoria, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico, indicando que no se puede eliminar la categoria porque tiene gastos asociados
            throw AppException.Conflict(
                "No se puede eliminar la categoria porque tiene gastos asociados.",
                ErrorCodes.CategoryWithExpenses
            );
        }

        await _categoryRepository.DeleteAsync(id);
    }

    // Metodo adicional para validar si existe una categoria por su nombre, utilizado en el controlador para evitar llamadas innecesarias al repositorio
    public async Task<bool> CategoryExistsByNameAsync(string name)
    {
        // Simplemente delegamos la validacion al repositorio para no incumplir el llamado de la capa de presentacion a la capa de datos, y asi mantener la separacion de responsabilidades entre capas
        return await _categoryRepository.ExistsByNameAsync(name.Trim());
    }
}
