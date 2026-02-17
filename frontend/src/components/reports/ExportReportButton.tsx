"use client";

import { useExportReport } from "@/hooks/expenses";
import { IoDownloadOutline } from "react-icons/io5";

type ExportReportButtonProps = {
  month: number;
  year: number;
};

export default function ExportReportButton({
  month,
  year,
}: Readonly<ExportReportButtonProps>) {
  const { mutate: exportReport, isPending: isExportingReport } =
    useExportReport();

  // Función para manejar la exportación del reporte
  const handleExport = async () => {
    exportReport({ month, year });
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExportingReport}
      className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:cursor-pointer shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <IoDownloadOutline
        className={`h-5 w-5 ${isExportingReport ? "animate-bounce" : ""}`}
      />
      {isExportingReport ? "Generando..." : "Exportar Reporte"}
    </button>
  );
}
