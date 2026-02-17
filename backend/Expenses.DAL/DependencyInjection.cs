using Expenses.DAL.Contracts;
using Expenses.DAL.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Expenses.DAL;

public static class DependencyInjection
{
    // Este método de extensión se encargará de registrar los servicios relacionados con la persistencia de datos
    public static IServiceCollection AddPersistenceServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        var basePath = AppDomain.CurrentDomain.BaseDirectory;

        // Obtenemos las rutas relativas de los archivos desde la configuración, 
        // con valores por defecto si no están configurados
        var categoriesRelativePath = configuration["FileStorage:CategoriesFile"] ?? "Data/categories.json";
        var expensesRelativePath = configuration["FileStorage:ExpensesFile"] ?? "Data/expenses.json";
        var reportsRelativePath = configuration["FileStorage:ReportsDirectory"] ?? "Data/Reports";

        // Construimos las rutas absolutas combinando el directorio base con las rutas relativas
        var categoriesPath = Path.Combine(basePath, categoriesRelativePath);
        var expensesPath = Path.Combine(basePath, expensesRelativePath);
        var reportsPath = Path.Combine(basePath, reportsRelativePath);

        // Registramos los repositorios como servicios singleton
        // Y pasamos la ruta del archivo directo al constructor
        services.AddSingleton<ICategoryRepository>(sp => new CategoryRepository(categoriesPath));
        services.AddSingleton<IExpenseRepository>(sp => new ExpenseRepository(expensesPath));
        services.AddSingleton<IReportRepository>(sp => new ReportRepository(reportsPath));

        // Si en el futuro se cambia a una base de datos, solo tendria que cambiar esta parte
        // sin afectar al resto de la aplicacion, gracias a la inyeccion de dependencias y a las interfaces.
        return services;
    }
}
