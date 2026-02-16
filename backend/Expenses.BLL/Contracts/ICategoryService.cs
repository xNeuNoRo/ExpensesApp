using Expenses.Entities.DTOs.Category;

namespace Expenses.BLL.Contracts;

public interface ICategoryService
{
    Task<IEnumerable<CategoryResponseDto>> GetCategoriesAsync();
    Task<IEnumerable<CategoryLookupResponseDto>> GetCategoryLookupAsync();
    Task<CategoryResponseDto> GetCategoryByIdAsync(Guid id);
    Task<CategoryResponseDto> GetCategoryByNameAsync(string name);
    Task<CategoryResponseDto> CreateCategoryAsync(CreateCategoryRequest request);
    Task UpdateCategoryAsync(Guid id, UpdateCategoryRequest request);
    Task DeleteCategoryAsync(Guid id);
    Task<bool> CategoryExistsByNameAsync(string name);
}
