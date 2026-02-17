namespace Expenses.Entities.Exceptions;

public static class ErrorCodes
{
    // Errores de gastos
    public const string InvalidAmount = "EXPENSE_INVALID_AMOUNT";
    public const string ExpenseNotFound = "EXPENSE_NOT_FOUND";

    // Errores de categorias
    public const string CategoryNotFound = "CATEGORY_NOT_FOUND";
    public const string DuplicateCategory = "CATEGORY_ALREADY_EXISTS";
    public const string CategoryWithExpenses = "CATEGORY_HAS_DEPENDENCIES";

    // Errores generales
    public const string InternalError = "INTERNAL_SERVER_ERROR";
    public const string ValidationError = "VALIDATION_ERROR";
}
