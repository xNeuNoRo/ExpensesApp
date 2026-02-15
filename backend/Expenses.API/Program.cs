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
