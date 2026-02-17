import { CATEGORY_ICONS } from "@/lib/category-icons";
import { IoShapes } from "react-icons/io5";

/**
 * @description Devuelve el componente de icono correspondiente a la clave dada, o un icono por defecto si no se encuentra.
 * @param iconKey La clave del icono que se desea obtener. Puede ser una cadena o null/undefined.
 * @returns El componente de icono correspondiente a la clave dada, o un icono por defecto si no se encuentra. Si la clave es válida y existe en el objeto CATEGORY_ICONS, se retorna el componente de icono correspondiente. Si la clave es null, undefined o no existe en el objeto CATEGORY_ICONS, se retorna el componente de icono por defecto (IoShapes).
 */
export const getIcon = (iconKey?: string | null) => {
  if (!iconKey || !CATEGORY_ICONS[iconKey]) return IoShapes; // Default
  return CATEGORY_ICONS[iconKey];
};
