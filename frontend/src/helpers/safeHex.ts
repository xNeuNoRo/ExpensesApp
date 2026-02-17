/**
 * @description Función para validar si un color es un valor hexadecimal válido y, si lo es, agregarle la opacidad.
 * @param color El color que se desea validar y modificar. Puede ser una cadena de texto que represente un color hexadecimal (con formato #RRGGBB o #RGB), o puede ser null o undefined. Si el valor es null o undefined, la función retornará undefined.
 * @param opacity La opacidad que se desea agregar al color hexadecimal. Debe ser una cadena de texto que represente un valor de opacidad en formato hexadecimal (por ejemplo, "80" para 50% de opacidad). Este valor se concatenará al final del color hexadecimal si este es válido.
 * @returns Si el color es un valor hexadecimal válido, la función retornará una nueva cadena de texto que combina el color hexadecimal con la opacidad (por ejemplo, "#RRGGBB80"). Si el color no es un valor hexadecimal válido o si el color es null o undefined, la función retornará undefined. Esta función es útil para asegurar que solo se utilicen colores hexadecimales válidos y para agregarles opacidad de manera segura.
 */
export function safeHex(color: string | null | undefined, opacity: string) {
  if (!color) return undefined;
  const isHex = /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);
  return isHex ? `${color}${opacity}` : undefined;
}
