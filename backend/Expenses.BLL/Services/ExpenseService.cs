using Expenses.BLL.Contracts;
using Expenses.BLL.Mapping;
using Expenses.DAL.Contracts;
using Expenses.Entities.DTOs.Expense;
using Expenses.Entities.DTOs.Reports;
using Expenses.Entities.Exceptions;
using Expenses.Entities.Models;

namespace Expenses.BLL.Services;

public class ExpenseService : IExpenseService
{
    private readonly IExpenseRepository _expenseRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IReportRepository _reportRepository;

    // Constructor para inyectar el repo de gastos y categorias
    public ExpenseService(
        IExpenseRepository expenseRepository,
        ICategoryRepository categoryRepository,
        IReportRepository reportRepository
    )
    {
        _expenseRepository = expenseRepository;
        _categoryRepository = categoryRepository;
        _reportRepository = reportRepository;
    }

    // Metodo para obtener la lista de gastos, con soporte para filtrar por categoria y rango de fechas, convertir los gastos a DTOs e incluir el nombre y color de la categoria en cada gasto para devolverlos al cliente
    public async Task<IEnumerable<ExpenseResponseDto>> GetExpensesAsync(ExpenseFilter filter)
    {
        // Obtenemos todos los gastos y categorias de la base de datos (JSON) para convertirlos a DTOs y devolverlos al cliente
        var expenses = await _expenseRepository.GetByFilterAsync(filter);

        // Si no hay gastos, retornamos una lista vacia de DTOs para evitar hacer consultas innecesarias a la base de datos de categorias
        if (!expenses.Any())
            return Enumerable.Empty<ExpenseResponseDto>();

        // Obtenemos los IDs de las categorias referenciadas por los gastos obtenidos, para luego obtener solo esas categorias de la base de datos y evitar cargar todas las categorias si no es necesario
        var referencedCategoryIds = expenses.Select(e => e.CategoryId).Distinct().ToHashSet();

        // Obtenemos todas las categorias (aunque parezca contraproducente con lo de arriba, ya tiene cache aplicado por debajo, asi que si ya se han cargado las categorias antes, esta llamada sera muy rapida y no tendra un gran impacto en el rendimiento)
        var allCategories = await _categoryRepository.GetAllAsync();

        // Filtramos las categorias para obtener solo las que son referenciadas por los gastos obtenidos, para luego pasar esa lista de categorias al metodo de extension ToDtoList() y que pueda incluir el nombre y color de la categoria en cada gasto convertido a DTO
        var referencedCategories = allCategories.Where(c => referencedCategoryIds.Contains(c.Id));

        // Convertimos los gastos a DTOs utilizando el metodo de extension ToDtoList() definido en ExpenseMappingExtensions, pasando tambien las categorias referenciadas para poder incluir el nombre de la categoria en el DTO
        return expenses.ToDtoList(referencedCategories);
    }

    // Metodo para obtener un gasto por su ID, convertirlo a DTO e incluir el nombre y color de la categoria en el DTO para devolverlo al cliente
    public async Task<ExpenseResponseDto> GetExpenseByIdAsync(Guid id)
    {
        // Obtenemos el gasto por su ID de la base de datos (JSON)
        var expense = await _expenseRepository.GetByIdAsync(id);

        // Si el gasto no existe, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
        if (expense == null)
        {
            throw AppException.NotFound(
                "No se encontro el gasto especificado.",
                ErrorCodes.ExpenseNotFound
            );
        }

        // Obtenemos la categoria del gasto para incluir su nombre y color en el DTO, si no existe la categoria, devolvemos "Sin Categoria" y un color por defecto
        var category = await _categoryRepository.GetByIdAsync(expense.CategoryId);

        // Convertimos el gasto a DTO utilizando el metodo de extension ToDto() definido en ExpenseMappingExtensions, pasando tambien el nombre y color de la categoria para incluirlos en el DTO
        return expense.ToDto(category?.Name ?? "Sin Categoria", category?.Color ?? "#000000");
    }

    // Metodo para crear un nuevo gasto, con sus respectivas validaciones, y devolver el gasto creado como DTO al cliente
    public async Task<ExpenseResponseDto> CreateExpenseAsync(CreateExpenseRequest request)
    {
        // Validamos que la categoria especificada exista antes de crear el gasto
        var category = await _categoryRepository.GetByIdAsync(request.CategoryId);

        // Si la categoria no existe, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
        if (category == null)
        {
            throw AppException.BadRequest(
                "La categoria especificada no existe.",
                ErrorCodes.CategoryNotFound
            );
        }

        // Pasamos el gasto del DTO a entidad
        var expense = request.ToEntity();

        // Guardamos el gasto en la base de datos (JSON)
        await _expenseRepository.AddAsync(expense);

        // Convertimos el gasto a DTO utilizando el metodo de extension ToDto() definido en ExpenseMappingExtensions, pasando tambien el nombre y color de la categoria para incluirlos en el DTO
        return expense.ToDto(category.Name, category.Color);
    }

    // Metodo para actualizar un gasto existente por su ID, con sus respectivas validaciones, y devolver la categoria actualizada como DTO al cliente
    public async Task UpdateExpenseAsync(Guid id, UpdateExpenseRequest request)
    {
        // Validamos que el gasto exista antes de actualizarlo
        var expense = await _expenseRepository.GetByIdAsync(id);

        // Si el gasto no existe, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
        if (expense == null)
        {
            throw AppException.NotFound(
                "No se encontro el gasto especificado.",
                ErrorCodes.ExpenseNotFound
            );
        }

        // Validamos que la categoria especificada exista antes de actualizar el gasto,
        // ignorando la categoria actual del gasto para permitir que
        // el gasto mantenga su categoria actual si no se especifica una nueva categoria,
        // o si se especifica una categoria diferente, validamos que exista esa categoria antes de actualizar el gasto
        if (expense.CategoryId != request.CategoryId)
        {
            var categoryExists = await _categoryRepository.GetByIdAsync(request.CategoryId);
            if (categoryExists == null)
            {
                throw AppException.BadRequest(
                    "La categoria especificada no existe.",
                    ErrorCodes.CategoryNotFound
                );
            }
        }

        // Actualizamos el gasto con los nuevos datos del DTO utilizando el metodo de extension UpdateFromRequest() definido en ExpenseMappingExtensions
        expense.UpdateFromRequest(request);

        // Guardamos los cambios en la base de datos (JSON)
        await _expenseRepository.UpdateAsync(expense);
    }

    // Metodo para eliminar un gasto por su ID, con sus respectivas validaciones
    public async Task DeleteExpenseAsync(Guid id)
    {
        // Validamos que el gasto exista antes de eliminarlo
        var expense = await _expenseRepository.GetByIdAsync(id);

        // Si el gasto no existe, lanzamos una excepcion personalizada AppException con un mensaje de error y un codigo de error especifico
        if (expense == null)
        {
            throw AppException.NotFound(
                "No se encontro el gasto especificado.",
                ErrorCodes.ExpenseNotFound
            );
        }

        // Eliminamos el gasto de la base de datos (JSON)
        await _expenseRepository.DeleteAsync(id);
    }

    // Metodo adicional para verificar si existen gastos asociados a una categoria dada, utilizado para validar que no se elimine una categoria que tiene gastos asociados
    public async Task<bool> HasExpensesInCategoryAsync(Guid categoryId)
    {
        // Verificamos si existen gastos asociados a la categoria dada
        return await _expenseRepository.HasExpensesByCategoryAsync(categoryId);
    }

    // Metodo para obtener el reporte mensual de gastos, con las estadisticas por categoria, para un mes y año especificos, y devolverlo como DTO al cliente
    public async Task<MonthlyReportDto> GetMonthlyReportAsync(int month, int year)
    {
        // Validamos que el mes y año proporcionados sean validos
        if (month < 1 || month > 12)
            throw AppException.BadRequest(
                "El mes debe estar entre 1 y 12.",
                ErrorCodes.ValidationError
            );

        // Idk, puse 3000 como limite pq no creo que esto exista en el futuro
        // Y 1970 ya que es el año 0 en Unix
        if (year < 1970 || year > 3000)
            throw AppException.BadRequest(
                "El año proporcionado no es válido.",
                ErrorCodes.ValidationError
            );

        // Creamos un filtro para obtener los gastos del mes y año especificados, estableciendo la fecha de inicio al primer dia del mes a las 00:00:00 y la fecha de fin al ultimo dia del mes a las 23:59:59, ambas en UTC para evitar problemas de zonas horarias
        var filter = new ExpenseFilter
        {
            StartDate = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc),
            EndDate = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddMonths(1)
                .AddTicks(-1), // Esto establece la fecha de fin al ultimo dia del mes a las 23:59:59.9999999, es decir, un tick antes de que comience el siguiente mes
        };

        // Obtenemos los gastos del mes y año especificados utilizando el filtro creado, y todas las categorias para poder calcular las estadisticas por categoria
        var expenses = await _expenseRepository.GetByFilterAsync(filter);
        var allCategories = await _categoryRepository.GetAllAsync();

        // Calculamos el total gastado sumando el monto de todos los gastos obtenidos
        decimal totalSpent = expenses.Sum(e => e.Amount);
        // El presupuesto total sumando el presupuesto mensual de todas las categorias obtenidas
        decimal totalBudget = allCategories.Sum(c => c.MonthlyBudget);
        // El gasto promedio dividiendo el total gastado entre la cantidad de gastos obtenidos, evitando division por cero si no hay gastos
        decimal averageSpend = expenses.Any() ? totalSpent / expenses.Count() : 0;

        // Creamos un diccionario para almacenar el monto gastado en cada categoria,
        // agrupando los gastos por su CategoryId y sumando el monto de los gastos en cada categoria
        var spendingByCategory = expenses
            .GroupBy(e => e.CategoryId)
            .ToDictionary(g => g.Key, g => g.Sum(x => x.Amount));
        // Ej: { GuidCategoria1: 150.00, GuidCategoria2: 75.50, ... }

        // Creamos un diccionario de las categorias para buscarla mas en detalle despues
        var categoryDict = allCategories.ToDictionary(c => c.Id);

        // Calculamos las estadisticas por categoria iterando sobre cada categoria:
        var details = spendingByCategory
            .Select(item =>
            {
                // Obtenemos el ID de la categoria y el monto gastado en esa categoria del diccionario de gastos por categoria
                var categoryId = item.Key;
                var spentAmount = item.Value;

                // Intentamos obtener la categoria correspondiente al ID utilizando el diccionario de categorias,
                // si no se encuentra la categoria, cat sera null
                categoryDict.TryGetValue(categoryId, out var cat);

                // Calculamos el porcentaje que representa el monto gastado en esa categoria
                // respecto al total gastado, evitando division por cero si el total gastado es cero
                double percentage =
                    totalSpent > 0 ? (double)spentAmount / (double)totalSpent * 100 : 0;

                // Creamos un objeto CategoryStatDto con el nombre y color de la categoria, el monto gastado en esa categoria, el presupuesto mensual de esa categoria, el porcentaje calculado y una alerta si el monto gastado en esa categoria supera su presupuesto mensual
                return new CategoryStatDto(
                    cat?.Name ?? "Sin Categoría",
                    cat?.Color ?? "#000000",
                    spentAmount,
                    cat?.MonthlyBudget ?? 0,
                    Math.Round(percentage, 2),
                    spentAmount > (cat?.MonthlyBudget ?? 0) // Check sencillo para devolver un booleano indicando si se ha superado el presupuesto de la categoria
                );
            })
            .OrderByDescending(s => s.AmountSpent) // Ordenamos las categorias por monto gastado de mayor a menor para mostrar primero las categorias en las que se ha gastado mas dinero
            .ToList(); // Convertimos el resultado a una lista

        // Creamos y devolvemos un objeto MonthlyReportDto con el mes, año, total gastado, presupuesto total y las estadisticas por categoria calculadas
        return new MonthlyReportDto(
            month,
            year,
            totalSpent,
            totalBudget,
            Math.Round(averageSpend, 2),
            details
        );
    }

    // Metodo para exportar el reporte mensual de gastos a un archivo JSON utilizando el ReportRepository
    // para guardar el reporte en el sistema de archivos, y devolver el nombre del archivo generado
    public async Task<string> ExportMonthlyReportAsync(int month, int year)
    {
        // Obtenemos el reporte mensual utilizando el metodo GetMonthlyReportAsync() definido anteriormente
        var report = await GetMonthlyReportAsync(month, year);

        // Generamos un nombre de archivo unico para el reporte utilizando el mes y año del reporte,
        // con el formato "resumen_YYYY_MM.json"
        string fileName = $"resumen_{year}_{month:D2}.json";

        // Guardamos el reporte en un archivo JSON utilizando el ReportRepository,
        // pasando el nombre del archivo y el objeto de reporte a guardar
        await _reportRepository.SaveReportAsync(fileName, report);

        // Devolvemos el nombre del archivo generado para que el cliente pueda descargarlo o acceder a el posteriormente
        return fileName;
    }
}
