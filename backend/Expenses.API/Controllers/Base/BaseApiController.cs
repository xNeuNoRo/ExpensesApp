using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers.Base;

// Esto es para tener una ruta comun para todos los controladores de la API
// De esa forma evito repetir el "api/v1" en cada controlador
[ApiController] // Esto es para que el framework sepa que esta clase es un controlador de API, y no un controlador de MVC
[Route("api/v1/[controller]")] // Esto es para que la ruta de cada controlador sea "api/v1/nombre-del-controlador", donde "nombre-del-controlador" es el nombre de la clase del controlador sin el sufijo "Controller"
public abstract class BaseApiController : ControllerBase { }
