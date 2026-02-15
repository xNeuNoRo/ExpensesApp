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
        // Leemos las rutas de los archivos desde la config
        var categoriesPath = configuration["FileStorage:CategoriesFile"] ?? "Data/categories.json";
        var expensesPath = configuration["FileStorage:ExpensesFile"] ?? "Data/expenses.json";

        // Registramos los repositorios como servicios singleton
        // Y pasamos la ruta del archivo directo al constructor
        services.AddSingleton<ICategoryRepository>(sp => new CategoryRepository(categoriesPath));
        services.AddSingleton<IExpenseRepository>(sp => new ExpenseRepository(expensesPath));

        // Si en el futuro se cambia a una base de datos, solo tendria que cambiar esta parte
        // sin afectar al resto de la aplicacion, gracias a la inyeccion de dependencias y a las interfaces.
        return services;
    }
}
