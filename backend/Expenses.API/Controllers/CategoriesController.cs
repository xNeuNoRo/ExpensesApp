using System.ComponentModel.DataAnnotations;
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

    // Este endpoint es para obtener la lista completa de categorias.
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Success(await _categoryService.GetCategoriesAsync()); // Devolvemos la lista de categorias utilizando el método Success heredado de BaseApiController.

    // Este endpoint es para obtener una categoria por su ID.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id) =>
        Success(await _categoryService.GetCategoryByIdAsync(id)); // Devolvemos la categoria encontrada utilizando el método Success heredado de BaseApiController.

    // Este endpoint es para crear una nueva categoria.
    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryRequest request)
    {
        // Delegamos al servicio la logica de crear una categoria
        // El resultado es la categoria creada, con su ID generado por la base de datos
        var result = await _categoryService.CreateCategoryAsync(request);

        // Lo delegamos al metodo CreatedSuccess de la clase base
        // Este metodo devuelve un 201 Created,
        // con un header "Location" que apunta al endpoint para obtener la categoria creada por su ID,
        return CreatedSuccess(nameof(GetById), new { id = result.Id }, result);
    }

    // Este endpoint es para actualizar una categoria existente, identificada por su ID.
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateCategoryRequest request)
    {
        // Delegamos al servicio la logica de actualizar una categoria
        // El servicio se encarga de validaciones, verificar que exista, etc..
        await _categoryService.UpdateCategoryAsync(id, request);
        return NoContent(); // 204 No Content
    }

    // Este endpoint es para eliminar una categoria por su ID.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        // Delegamos al servicio la logica de eliminar una categoria
        // El servicio se encarga de validaciones, verificar que exista, etc..
        await _categoryService.DeleteCategoryAsync(id);
        return NoContent(); // 204 No Content
    }

    // Este endpoint es para validar si un nombre de categoria ya existe, para evitar duplicados.
    [HttpGet("validate-name")]
    public async Task<IActionResult> ValidateName(
        [FromQuery, Required(ErrorMessage = "El nombre es obligatorio.")] string name
    )
    {
        // Delegamos al servicio la logica de validar si el nombre de la categoria ya existe
        // El resultado es un booleano que indica si el nombre ya existe o no
        var nameExists = await _categoryService.CategoryExistsByNameAsync(name);

        // Devolvemos un objeto anonimo con la propiedad "available", que indica si el nombre de la categoria esta disponible o no
        return Success(new { available = !nameExists });
    }

    // Este endpoint es para obtener una categoria por su nombre
    [HttpGet("search")]
    public async Task<IActionResult> GetByName(
        [FromQuery, Required(ErrorMessage = "El nombre es obligatorio.")] string name
    )
    {
        var category = await _categoryService.GetCategoryByNameAsync(name);
        return Success(category);
    }

    // Este endpoint es para obtener un lookup de categorias, que incluye solo el ID y el nombre de cada categoria,
    // para ser utilizado en dropdowns o selects en el frontend.
    [HttpGet("lookup")]
    public async Task<IActionResult> GetLookup()
    {
        // Delegamos al servicio la logica de obtener el lookup de categorias
        // El resultado es una lista de objetos con solo el ID y el nombre de cada categoria
        return Success(await _categoryService.GetCategoryLookupAsync());
    }
}
