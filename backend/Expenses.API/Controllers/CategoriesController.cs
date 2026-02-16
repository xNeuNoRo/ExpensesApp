using Expenses.API.Controllers.Base;
using Expenses.BLL.Contracts;
using Expenses.Entities.DTOs.Category;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers;

public class CategoriesController : BaseApiController
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Success(await _categoryService.GetCategoriesAsync());

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id) =>
        Success(await _categoryService.GetCategoryByIdAsync(id));

    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryRequest request)
    {
        // Delegamos al servicio la logica de crear una categoria
        var result = await _categoryService.CreateCategoryAsync(request);

        // Lo delegamos al metodo CreatedSuccess de la clase base
        return CreatedSuccess(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateCategoryRequest request)
    {
        // Delegamos al servicio la logica de actualizar una categoria
        await _categoryService.UpdateCategoryAsync(id, request);
        return NoContent(); // 204 No Content
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        // Delegamos al servicio la logica de eliminar una categoria
        await _categoryService.DeleteCategoryAsync(id);
        return NoContent(); // 204 No Content
    }

    [HttpGet("validate-name")]
    public async Task<IActionResult> ValidateName([FromQuery] string name)
    {
        // Delegamos al servicio la logica de validar si el nombre de la categoria ya existe
        var nameExists = await _categoryService.CategoryExistsByNameAsync(name);

        // Devolvemos un objeto anonimo con la propiedad "available", que indica si el nombre de la categoria esta disponible o no
        return Success(new { available = !nameExists });
    }

    [HttpGet("name/{name}")]
    public async Task<IActionResult> GetByName(string name)
    {
        var category = await _categoryService.GetCategoryByNameAsync(name);
        return Success(category);
    }

    [HttpGet("lookup")]
    public async Task<IActionResult> GetLookup()
    {
        // Delegamos al servicio la logica de obtener el lookup de categorias
        return Success(await _categoryService.GetCategoryLookupAsync());
    }
}
