"use client";

import { useId } from "react";
import CategorySelect from "@/components/shared/CategorySelect";
import { ExpenseFilter } from "@/schemas/expense";
import { IoTrashOutline } from "react-icons/io5";

type ExpenseFiltersProps = {
  filters: ExpenseFilter;
  onFilterChange: (newFilters: ExpenseFilter) => void;
};

export default function ExpenseFilters({
  filters,
  onFilterChange,
}: Readonly<ExpenseFiltersProps>) {
  // Generamos IDs únicos para los campos de fecha para asociar correctamente las etiquetas
  const startDateId = useId();
  const endDateId = useId();

  // Manejadores para los cambios en los filtros
  // Cada uno actualiza el filtro correspondiente y llama a onFilterChange con los nuevos filtros

  const handleCategoryChange = (categoryId: string) => {
    // Si el categoryId es una cadena vacía, lo convertimos a null para indicar que no hay filtro de categoría
    onFilterChange({ ...filters, categoryId: categoryId || null });
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    // Si el valor de la fecha es una cadena vacía,
    // lo convertimos a null para indicar que no hay filtro de fecha
    onFilterChange({ ...filters, [field]: value || null });
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase text-muted">
        Filtrar Movimientos
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Filtro de Categoría */}
        <div className="flex flex-col gap-2">
          <CategorySelect
            value={filters.categoryId ?? ""}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Filtro Fecha Inicio */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={startDateId}
            className="text-sm font-semibold text-main"
          >
            Desde
          </label>
          <input
            id={startDateId}
            type="date"
            value={filters.startDate ?? ""}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className="block w-full rounded-lg border border-border bg-background p-2.5 text-sm text-main focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Filtro Fecha Fin */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={endDateId}
            className="text-sm font-semibold text-main"
          >
            Hasta
          </label>
          <input
            id={endDateId}
            type="date"
            value={filters.endDate ?? ""}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className="block w-full rounded-lg border border-border bg-background p-2.5 text-sm text-main focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() =>
            onFilterChange({ categoryId: null, startDate: null, endDate: null })
          }
          type="button"
          className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm font-medium text-muted transition-all hover:cursor-pointer hover:border-danger hover:bg-danger/10 hover:text-danger active:scale-95"
        >
          <IoTrashOutline className="h-4 w-4" />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
