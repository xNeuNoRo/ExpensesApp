using Expenses.API.Extensions;
using Expenses.API.Middlewares;
using Expenses.BLL;
using Expenses.DAL;
using Expenses.Entities.Exceptions;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Registramos el servicio de OpenAPI (Swagger) para documentación de la API
builder.Services.AddOpenApi();

// Inyectamos las capas personalizadas que hemos creado previamente
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddBusinessServices();

// Configuramos CORS para permitir solicitudes desde el frontend
// Usando los origenes permitidos definidos en el archivo de appsettings
// En caso de que no se encuentre se permite solo desde localhost:3000 (que es donde corre el frontend de next.js)
var allowedOrigins =
    builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? ["http://localhost:3000"];

// Le decimos a CORS que permita solicitudes desde los origenes definidos
builder.Services.AddCors(options =>
{
    // Definimos una politica de CORS llamada "DefaultPolicy"
    options.AddPolicy(
        "DefaultPolicy",
        policy =>
        {
            // Configuramos la politica para permitir solicitudes desde los origenes definidos
            policy
                .WithOrigins(allowedOrigins)
                .AllowAnyHeader() // Permite cualquier header en las solicitudes CORS
                .AllowAnyMethod() // Permite cualquier metodo HTTP (GET, POST, PUT, DELETE, etc.) en las solicitudes CORS
                .AllowCredentials(); // Permite el uso de cookies y otras credenciales en las solicitudes CORS
        }
    );
});

// Configuramos la respuesta de error personalizada para los casos en que el modelo de datos no sea válido
// (por ejemplo, si faltan campos requeridos o si los datos no cumplen con las validaciones definidas en los DTOs)
builder
    .Services.AddControllers(options =>
    {
        // Configuramos los mensajes de error personalizados para las validaciones de model binding,
        // utilizando el mEtodo de extensiOn que definimos en MvcOptionsExtensions
        options.ConfigureModelBindingMessages();
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        // Sobrescribimos la fábrica de respuestas para modelos no válidos,
        // para devolver una respuesta consistente con nuestro formato de ApiResponse
        options.InvalidModelStateResponseFactory = context =>
        {
            // Extraemos los errores de validación del ModelState,
            // creando una lista de objetos con el campo y el mensaje de error
            var errors = context
                .ModelState.Where(e => e.Value?.Errors.Count > 0) // Filtramos solo los campos que tienen errores de validación
                .Select(e => new
                {
                    Field = e.Key, // El nombre del campo que tiene el error de validación
                    Message = e.Value?.Errors[0].ErrorMessage, // Solo mapeamos el primer error de validacion para simplificar la respuesta
                })
                .ToList();

            // Creamos un objeto de respuesta con el formato de ApiResponse,
            // indicando que no fue exitoso y agregando los errores de validación en la sección de error
            var response = new
            {
                Ok = false,
                Data = (object?)null,
                Error = new
                {
                    code = ErrorCodes.ValidationError, // Usamos un código de error específico para errores de validación
                    message = "Uno o más campos tienen errores de validación.",
                    details = errors, // Agregamos los errores de validación en la sección de detalles del error
                },
            };

            // Devolvemos una respuesta HTTP 400 Bad Request con el objeto de respuesta creado
            return new BadRequestObjectResult(response);
        };
    });

// Construimos la aplicación a partir de la configuración y servicios registrados
var app = builder.Build();

// Configuramos el pipeline de procesamiento de las solicitudes HTTP

// Aqui agregamos nuestro middleware personalizado para manejar excepciones de manera centralizada en toda la aplicación
app.UseMiddleware<ExceptionMiddleware>();

// Si estamos en desarrollo, habilitamos la documentación de la API con Swagger/OpenAPI
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Redirigimos todas las solicitudes HTTP a HTTPS para mayor seguridad
app.UseHttpsRedirection();

// Habilitamos CORS con la politica "DefaultPolicy" que definimos anteriormente, para permitir solicitudes desde el frontend
app.UseCors("DefaultPolicy");

// Habilitamos la autorización, aunque en este punto no hemos configurado nada relacionado a la autorización, es una buena práctica tenerlo en el pipeline (por si acaso) por si se necesita en el futuro
app.UseAuthorization();

// Mapeamos los controladores para que puedan manejar las solicitudes HTTP entrantes
app.MapControllers();

// Finalmente, ejecutamos la aplicación, lo que pone en marcha el servidor web y comienza a escuchar las solicitudes HTTP
await app.RunAsync();
