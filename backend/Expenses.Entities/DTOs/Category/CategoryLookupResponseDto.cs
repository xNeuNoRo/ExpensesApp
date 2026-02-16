namespace Expenses.Entities.DTOs.Category;

// DTO sencillo para retornar solamente el Id y el Nombre
// Este puede servir para un dropdown o otra cosa rapida en el front
public record CategoryLookupResponseDto(Guid Id, string Name);
