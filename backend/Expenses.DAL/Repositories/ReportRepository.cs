using System.Text.Json;
using Expenses.DAL.Contracts;

namespace Expenses.DAL.Repositories;

public class ReportRepository : IReportRepository
{
    // Este repositorio se encarga de guardar los reportes generados en formato JSON en el sistema de archivos.
    private readonly string _reportsPath;
    private readonly JsonSerializerOptions _options;

    // Constructor que recibe la ruta base donde se guardarán los reportes,
    // y configura las opciones de serialización JSON
    public ReportRepository(string reportsPath)
    {
        // Guardamos la ruta base para los reportes y configuramos las opciones de serialización JSON
        _reportsPath = reportsPath;

        // Configuramos las opciones de serialización JSON para que el output sea legible
        _options = new JsonSerializerOptions
        {
            WriteIndented = true, // Para que el JSON generado tenga indentación y sea más fácil de leer
            PropertyNameCaseInsensitive = true, // Para que la deserialización no sea sensible a mayúsculas/minúsculas en los nombres de las propiedades
        };

        // Verificamos que el directorio para los reportes exista, si no existe lo creamos
        if (!Directory.Exists(_reportsPath))
            Directory.CreateDirectory(_reportsPath);
    }

    // Este método guarda un reporte en formato JSON en el sistema de archivos.
    public async Task SaveReportAsync<T>(string fileName, T data)
    {
        // Construimos la ruta completa del archivo utilizando el directorio base de la app
        // y el nombre del archivo proporcionado
        var path = Path.Combine(_reportsPath, fileName);

        // Serializamos el objeto de datos a formato JSON
        var json = JsonSerializer.Serialize(data, _options);

        // Escribimos el contenido JSON en el archivo de forma asincronica
        await File.WriteAllTextAsync(path, json);
    }
}
