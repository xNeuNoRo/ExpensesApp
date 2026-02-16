using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Extensions;

public static class MvcOptionsExtensions
{
    // Este metodo de extension se encarga de configurar los mensajes de error personalizados
    // para las validaciones de model binding.
    public static void ConfigureModelBindingMessages(this MvcOptions options)
    {
        var provider = options.ModelBindingMessageProvider;

        // Personalizamos los mensajes de error para que sean más claros y específicos, en lugar de los mensajes genéricos que ASP.NET Core proporciona por defecto.

        // Error cuando el valor proporcionado no es valido para el campo especifico
        provider.SetAttemptedValueIsInvalidAccessor(
            (v, f) => $"El valor '{v}' no es válido para el campo '{f}'."
        );
        // Error cuando el valor proporcionado no es valido para un campo que no se pudo identificar
        provider.SetUnknownValueIsInvalidAccessor(
            (f) => $"El valor proporcionado no es válido para el campo '{f}'."
        );

        // Error cuando el valor proporcionado no es valido para un campo que no se pudo identificar
        // y no se conoce el nombre del campo
        provider.SetNonPropertyAttemptedValueIsInvalidAccessor(
            (v) => $"El valor '{v}' no es válido."
        );
        // Error cuando el valor proporcionado es null para un campo que no se pudo identificar
        provider.SetNonPropertyUnknownValueIsInvalidAccessor(() =>
            "El valor proporcionado no es válido."
        );

        // Error cuando el valor proporcionado es null para un campo que no se pudo identificar
        provider.SetValueIsInvalidAccessor((v) => $"El valor '{v}' es inválido.");
        // Cuando envían null y no se permite que sea null
        provider.SetValueMustNotBeNullAccessor((f) => $"El valor '{f}' no es válido.");
        // Error cuando se espera un cuerpo de petición pero no se proporciona ninguno
        provider.SetMissingRequestBodyRequiredValueAccessor(() =>
            "Se requiere un cuerpo de petición no vacío."
        );
        // Error cuando falta un valor para un campo específico que es requerido
        provider.SetMissingBindRequiredValueAccessor((f) => $"Falta un valor para el campo '{f}'.");
        // Error cuando se esperaba un valor pero no se proporcionó ninguno
        provider.SetMissingKeyOrValueAccessor(() => "Se requiere un valor.");

        // Error cuando se esperaba un número pero se proporcionó un valor que no es un número
        provider.SetNonPropertyValueMustBeANumberAccessor(() => "El campo debe ser un número.");
        // Error cuando se esperaba un número para un campo específico pero se proporcionó un valor que no es un número
        provider.SetValueMustBeANumberAccessor((f) => $"El campo '{f}' debe ser un número.");
    }
}
