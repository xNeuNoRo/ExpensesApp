"use client";

import { useId } from "react";

// Definimos las props que recibirá el componente ReportFilters
type ReportFiltersProps = {
  month: number;
  year: number;
  onChange: (filters: { month: number; year: number }) => void;
};

// Lista de meses en español para mostrar en el select
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function ReportFilters({
  month,
  year,
  onChange,
}: Readonly<ReportFiltersProps>) {
  const monthId = useId();
  const yearId = useId();

  // Generamos una lista de años (del actual hacia atrás 5 años)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  // Renderizamos los filtros de mes y año
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-surface p-6 rounded-xl border border-border shadow-sm">
      <div className="flex-1 flex flex-col gap-2">
        <label htmlFor={monthId} className="text-sm font-semibold text-main">
          Mes
        </label>
        <select
          id={monthId}
          value={month}
          onChange={(e) => onChange({ month: Number(e.target.value), year })}
          className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-main hover:cursor-pointer focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <label htmlFor={yearId} className="text-sm font-semibold text-main">
          Año
        </label>
        <select
          id={yearId}
          value={year}
          onChange={(e) => onChange({ month, year: Number(e.target.value) })}
          className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-main hover:cursor-pointer focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
