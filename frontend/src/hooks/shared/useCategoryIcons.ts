import { useMemo } from "react";
import { getIcon } from "@/helpers/getIcon";

/**
 * @description Hook personalizado para obtener el componente de icono de categoría basado en una clave dada. Utiliza useMemo para memorizar el resultado y evitar cálculos innecesarios en re-renderizados.
 * @param iconKey La clave del icono que se desea obtener. Puede ser una cadena o null/undefined. Si la clave es válida y existe en el objeto CATEGORY_ICONS, se retornará el componente de icono correspondiente. Si la clave es null, undefined o no existe en el objeto CATEGORY_ICONS, se retornará un icono por defecto.
 * @returns El componente de icono correspondiente a la clave dada, o un icono por defecto si no se encuentra. El resultado se memoriza para optimizar el rendimiento y evitar cálculos innecesarios en re-renderizados.
 */
export function useCategoryIcons(iconKey?: string) {
  return useMemo(() => getIcon(iconKey), [iconKey]);
}
