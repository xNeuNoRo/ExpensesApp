namespace Expenses.API.Models;

public record ErrorResponse(int Status, string Message, string? ErrorCode = null);
