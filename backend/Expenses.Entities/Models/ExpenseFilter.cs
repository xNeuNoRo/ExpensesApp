using System.ComponentModel.DataAnnotations;

namespace Expenses.Entities.Models;

// Esta clase se utiliza para filtrar los gastos por categoria y rango de fechas al obtener la lista de gastos (solo en memoria)
public class ExpenseFilter : IValidatableObject // Implementamos la interfaz IValidatableObject para poder validar las propiedades del filtro de manera personalizada
{
    public Guid? CategoryId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    // Este metodo se ejecuta automaticamente cuando se valida el modelo en el controlador
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        // yield => es como un return pero que solo devuele el valor cuando se le solicita, no al momento de ejecutarse el metodo.

        // Validamos que si se proporcionan ambas fechas, la fecha de fin no sea anterior a la fecha de inicio
        if (StartDate.HasValue && EndDate.HasValue && EndDate < StartDate)
        {
            yield return new ValidationResult(
                "La fecha de fin no puede ser anterior a la fecha de inicio.",
                [nameof(EndDate)] // Indica que el error está en el campo 'EndDate'
            );
        }

        // Validamos que la fecha de inicio no sea una fecha futura,
        // ya que no tendría sentido filtrar por una fecha que aún no ha ocurrido
        if (StartDate.HasValue && StartDate > DateTime.UtcNow)
        {
            yield return new ValidationResult(
                "La fecha de inicio no puede ser una fecha futura.",
                [nameof(StartDate)] // Indica que el error está en el campo 'StartDate'
            );
        }

        // Validamos que la fecha de inicio no sea una fecha muy antigua, por ejemplo anterior al año 2000,
        // ya que no tendría sentido filtrar por una fecha tan antigua y podría indicar un error
        if (StartDate.HasValue && StartDate.Value.Year < 2000)
        {
            yield return new ValidationResult(
                "La fecha de inicio debe ser posterior al año 2000.",
                [nameof(StartDate)] // Indica que el error está en el campo 'StartDate'
            );
        }
    }
}
