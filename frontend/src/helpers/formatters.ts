import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * @description Formatea un número como moneda en formato dominicano (DOP).
 * @param amount El monto numérico a formatear.
 * @returns Una cadena formateada como moneda, por ejemplo: "RD$ 1,234.56".
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  }).format(amount);
}

/**
 * @description Formatea una fecha en formato ISO a un formato legible en español, ajustando la zona horaria para evitar desfases. Por ejemplo, "2024-06-15" se formateará como "15 junio 2024".
 * @param dateISO Una cadena de fecha en formato ISO (YYYY-MM-DD).
 * @returns Una cadena formateada con el día, mes (en español) y año.
 */
export function formatDate(dateISO: string): string {
  const date = new Date(dateISO);
  // Ajustamos la fecha a la zona horaria local para evitar problemas de desfase
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  // Convertimos la fecha a UTC para que se formatee correctamente sin importar la zona horaria del usuario
  const utcDate = new Date(date.getTime() + userTimezoneOffset);
  return format(utcDate, "dd MMMM yyyy", { locale: es });
}
