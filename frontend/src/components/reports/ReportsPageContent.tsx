"use client";

import { useMonthlyReport } from "@/hooks/expenses/useQueries"; //
import ReportFilters from "@/components/reports/ReportFilters";
import ReportSummary from "@/components/reports/ReportSummary";
import ReportCategoryList from "@/components/reports/ReportCategoryList";
import ExportReportButton from "@/components/reports/ExportReportButton";
import { IoBarChart } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ReportsPageContent() {
  // Extraemos los search params y el pathname para controlar los filtros y la navegación
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Obtenemos el mes y año actuales para inicializar los filtros
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Obtenemos el mes y año de los parámetros de búsqueda, o usamos los actuales si no están presentes
  const month = Number(searchParams.get("month")) || currentMonth;
  const year = Number(searchParams.get("year")) || currentYear;

  const handleFilterChange = (newFilters: { month: number; year: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", newFilters.month.toString());
    params.set("year", newFilters.year.toString());

    // Actualizamos la URL sin recargar la página (scroll: false evita saltos)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Consumimos el reporte mensual
  const { data: report, isLoading, isError } = useMonthlyReport(month, year);

  // Preparar el contenido fuera del JSX para evitar ternarios anidados
  let content;
  if (isLoading) {
    content = (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-surface rounded-xl border border-border" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 bg-surface rounded-xl border border-border" />
          <div className="h-48 bg-surface rounded-xl border border-border" />
        </div>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background text-center p-8">
        <p className="text-danger font-medium">
          Ocurrió un error al cargar el reporte. Inténtalo de nuevo más tarde.
        </p>
      </div>
    );
  } else if (report) {
    content = (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Componente del Paso 2 (Corregido) */}
        <ReportSummary report={report} />

        {/* Componente del Paso 3 */}
        <ReportCategoryList details={report.details} />
      </div>
    );
  } else {
    content = (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background text-center p-8">
        <div className="rounded-full bg-surface p-4 mb-4 text-muted">
          <IoBarChart className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium text-main">Sin datos</h3>
        <p className="text-muted max-w-sm mt-1">
          No hay información disponible para el periodo seleccionado.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header de la página */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-main">
            Reportes Mensuales
          </h1>
          <p className="text-muted text-sm">
            Analiza la distribución de tus gastos y el cumplimiento de tus
            presupuestos.
          </p>
        </div>

        {/* Solo mostramos el botón de exportar si hay datos en el reporte */}
        {report && report.details.length > 0 && (
          <ExportReportButton month={month} year={year} />
        )}
      </div>

      {/* Filtros de selección de periodo */}
      <ReportFilters month={month} year={year} onChange={handleFilterChange} />
      {content}
    </div>
  );
}
