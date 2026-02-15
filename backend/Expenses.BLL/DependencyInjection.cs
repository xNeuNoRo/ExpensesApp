using Expenses.BLL.Contracts;
using Expenses.BLL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Expenses.BLL;

public static class DependencyInjection
{
    // Este método de extensión se encargará de registrar los servicios relacionados con la lógica de negocio
    public static IServiceCollection AddBusinessServices(this IServiceCollection services)
    {
        // Registramos los servicios de negocio como scoped, ya que pueden tener dependencias que también son scoped
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IExpenseService, ExpenseService>();

        // Si en el futuro se agregan más servicios de negocio, solo tendria que registrarlos aquí

        return services;
    }
}
