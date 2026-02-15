namespace Expenses.Entities.Models;

public class Expense
{
    // Guid porque es el identificador mas escalable y facil de operar
    // Id es init porque no se podra cambiar una vez creado el objeto, ya que el Id es la clave primaria y no deberia cambiarse
    public Guid Id { get; init; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public Guid CategoryId { get; set; }

    // Constructor vacio para que el repositorio usando reflection pueda crear instancias de Expense
    public Expense() { }

    // Constructor para la BLL
    public Expense(string description, decimal amount, Guid categoryId, DateTime? date = null)
    {
        Id = Guid.NewGuid();
        Description = description;
        Amount = amount;
        CategoryId = categoryId;
        Date = date ?? DateTime.Now;
    }
}
