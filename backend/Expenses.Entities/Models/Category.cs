namespace Expenses.Entities.Models;

public class Category
{
    // Guid porque es el identificador mas escalable y facil de operar
    // Id es init porque no se podra cambiar una vez creado el objeto, ya que el Id es la clave primaria y no deberia cambiarse
    public Guid Id { get; init; }
    public required string Name { get; set; } = string.Empty;
    public decimal MonthlyBudget { get; set; }

    // IconKey sera la clave para identificar el icono en el frontend, idk por ahora lo dejare como "DefaultIcon" hasta que haga el frontend y vea como manejar los iconos
    public string IconKey { get; set; } = "DefaultIcon";
    public string Color { get; set; } = "#EF4444"; // Rojo por defecto

    // Constructor vacio para que el repositorio usando reflection pueda crear instancias de Category
    public Category() { }

    // Constructor para la BLL
    public Category(string name, decimal monthlyBudget, string? icon = null, string? color = null)
    {
        Id = Guid.NewGuid();
        Name = name;
        MonthlyBudget = monthlyBudget;

        // Si se proporciona un icono o color, se asignan a las propiedades correspondientes
        if (!string.IsNullOrEmpty(icon))
        {
            IconKey = icon;
        }
        if (!string.IsNullOrEmpty(color))
        {
            Color = color;
        }
    }
}
