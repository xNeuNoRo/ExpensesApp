using Expenses.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers.Base;

// Esto es para tener una ruta comun para todos los controladores de la API
// De esa forma evito repetir el "api/v1" en cada controlador
[ApiController] // Esto es para que el framework sepa que esta clase es un controlador de API, y no un controlador de MVC
[Route("api/v1/[controller]")] // Esto es para que la ruta de cada controlador sea "api/v1/nombre-del-controlador", donde "nombre-del-controlador" es el nombre de la clase del controlador sin el sufijo "Controller"
public abstract class BaseApiController : ControllerBase
{
    protected IActionResult Success<T>(T data)
    {
        return Ok(new ApiResponse<T>(data));
    }

    protected IActionResult CreatedSuccess<T>(string actionName, object routeValues, T data)
    {
        var response = new ApiResponse<T>(data);

        // --------------------------------
        // * CreatedAtAction(...) es para devolver un 201 Created,
        // y ademas incluir en la respuesta la ruta para obtener el recurso creado
        // En el apartado de "Location" del header de la respuesta.

        //  * actionName es el nombre del metodo para obtener el recurso creado, por ejemplo "GetById",
        // lo recomendado es usarlo con nameof() por si este metodo cambia de nombre

        // * routeValues es el objeto anonomo con las propiedades necesarias para construir la ruta, por ejemplo new { id = result.Id }
        // Si el metodo es GetById y require dicho id, entonces se le pasa new { id = result.Id }, donde result.Id es el id del recurso creado, que se va a incluir en la ruta de la respuesta

        // * result es el recurso creado, que se va a incluir en la respuesta
        return CreatedAtAction(actionName, routeValues, response);
    }
}
