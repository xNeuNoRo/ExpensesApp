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
 * @description Formatea una fecha ISO a un formato legible en español, por ejemplo: "15 de marzo de 2024".
 * @param dateISO La fecha en formato ISO (por ejemplo: "2024-03-15T00:00:00.000Z").
 * @returns Una cadena con la fecha formateada, por ejemplo: "15 de marzo de 2024".
 */
export function formatDate(dateISO: string): string {
  return format(new Date(dateISO), "dd MMMM yyyy", { locale: es });
}
