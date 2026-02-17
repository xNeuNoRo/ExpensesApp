"use client";

import classNames from "@/helpers/classNames";
import { ExpenseSortField, SortConfig } from "@/types";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

type SortableHeaderProps = {
  field: ExpenseSortField;
  label: string;
  currentSort: SortConfig; // Usamos la configuración genérica
  onSort: (field: ExpenseSortField) => void;
  align?: "left" | "center" | "right";
  className?: string;
};

export default function SortableHeader({
  field,
  label,
  currentSort,
  onSort,
  align = "left",
  className = "",
}: Readonly<SortableHeaderProps>) {
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

  // Clases de alineación para el contenido del header
  const alignClasses = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  return (
    <th
      scope="col"
      aria-sort={ariaSortValue}
      className={`p-0 font-semibold ${className}`}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="group flex h-full w-full items-center px-6 py-4 transition-colors hover:cursor-pointer hover:bg-surface/80 hover:text-main focus:outline-none focus:bg-surface/80"
      >
        <div
          className={`flex w-full items-center gap-1 ${alignClasses[align]}`}
        >
          <span>{label}</span>

          {/* Icono de Ordenamiento */}
          <span
            className={classNames(
              isSorted
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-50 group-focus:opacity-50",
              "flex items-center transition-opacity",
            )}
          >
            {isSorted && currentSort.direction === "asc" ? (
              <IoChevronUp className="h-4 w-4 text-primary" />
            ) : (
              <IoChevronDown
                className={classNames(
                  isSorted ? "text-primary" : "text-muted",
                  "h-4 w-4",
                )}
              />
            )}
          </span>
        </div>
      </button>
    </th>
  );
}
