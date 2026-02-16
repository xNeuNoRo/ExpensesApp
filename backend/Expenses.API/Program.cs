using Expenses.API.Middlewares;
using Expenses.BLL;
using Expenses.DAL;

var builder = WebApplication.CreateBuilder(args);

// Registramos los servicios necesarios para el funcionamiento de la aplicación, como controladores y OpenAPI (Swagger) para documentación de la API
builder.Services.AddControllers();
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

// Habilitamos la autorización, aunque en este punto no hemos configurado nada relacionado a la autorización, es una buena práctica tenerlo en el pipeline (por si acaso) por si se necesita en el futuro
app.UseAuthorization();

// Mapeamos los controladores para que puedan manejar las solicitudes HTTP entrantes
app.MapControllers();

// Finalmente, ejecutamos la aplicación, lo que pone en marcha el servidor web y comienza a escuchar las solicitudes HTTP
await app.RunAsync();
