import { z } from "zod";

// Respuestas de error de la API

// Detalles de error específicos para campos individuales
export const ApiErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});

// Esquema para errores generales de la API
export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.array(ApiErrorDetailSchema).optional().nullable(),
});

// Tipos inferidos para los errores
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;

// Tipo TypeScript inferido a partir del esquema de respuesta de la API
// Solamente dos estados posibles, uno con datos y sin error, y otro con error y sin datos
export type ApiResponseStrictFromSchema<T extends z.ZodType> =
  | { ok: true; data: z.infer<T>; error: null }
  | { ok: false; data: null; error: ApiError };

// Factory para crear un esquema de respuesta de la API que valida tanto el caso de éxito como el de error
export const ApiResponseStrictSchema = <T extends z.ZodType>(dataSchema: T) =>
  // Usamos discriminatedUnion para garantizar que solo uno de los dos estados sea posible
  // El valor a discriminar es "ok", que es un booleano literal en cada caso
  z.discriminatedUnion("ok", [
    // Caso de éxito: ok es true, data es del tipo esperado, error es null
    z.object({
      ok: z.literal(true),
      data: dataSchema,
      error: z.null(),
    }),
    // Caso de error: ok es false, data es null, error es del tipo ApiError
    z.object({
      ok: z.literal(false),
      data: z.null(),
      error: ApiErrorSchema,
    }),
  ]) as z.ZodType<ApiResponseStrictFromSchema<T>>;
