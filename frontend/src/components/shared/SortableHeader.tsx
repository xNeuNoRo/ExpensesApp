"use client";

import { SortConfig } from "@/types";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

export type SortDirection = "asc" | "desc";

type SortableHeaderProps<T = string> = {
  field: T;
  label: string;
  currentSort: SortConfig; // Usamos la configuración genérica
  onSort: (field: T) => void;
  align?: "left" | "center" | "right";
  className?: string;
};

export default function SortableHeader<T = string>({
  field,
  label,
  currentSort,
  onSort,
  align = "left",
  className = "",
}: Readonly<SortableHeaderProps<T>>) {
  const isSorted = currentSort.field === field;

  // Determinar el valor de aria-sort para accesibilidad
  let ariaSortValue: "none" | "ascending" | "descending";
  if (!isSorted) {
    ariaSortValue = "none";
  } else if (currentSort.direction === "asc") {
    ariaSortValue = "ascending";
  } else {
    ariaSortValue = "descending";
  }

  // Clases de justificación para el contenido del header
  let justifyClass = "justify-start";
  if (align === "right") {
    justifyClass = "justify-end";
  } else if (align === "center") {
    justifyClass = "justify-center";
  }

  return (
    <th
      scope="col"
      className={`
        px-6 py-4 font-semibold cursor-pointer select-none transition-colors 
        hover:bg-surface/80 hover:text-main group 
        text-${align} ${className}
      `}
      onClick={() => onSort(field)}
      title={`Ordenar por ${label}`}
      aria-sort={ariaSortValue}
    >
      <div className={`flex items-center gap-1 ${justifyClass}`}>
        {label}

        {/* Icono de Ordenamiento */}
        <span
          className={`flex items-center transition-opacity ${isSorted ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`}
        >
          {isSorted && currentSort.direction === "asc" ? (
            <IoChevronUp className="h-4 w-4 text-primary" />
          ) : (
            <IoChevronDown
              className={`h-4 w-4 ${isSorted ? "text-primary" : "text-muted"}`}
            />
          )}
        </span>
      </div>
    </th>
  );
}
