"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatCurrency } from "@/helpers/formatters";
import { MonthlyReport } from "@/schemas/expense";
import { IoWallet, IoTrendingDown, IoCash } from "react-icons/io5";

type ReportSummaryProps = {
  report: MonthlyReport;
};

export default function ReportSummary({
  report,
}: Readonly<ReportSummaryProps>) {
  // Calculamos el porcentaje global
  const budgetPercentage =
    report.totalBudget > 0 ? (report.totalSpent / report.totalBudget) * 100 : 0;

  // Limitamos el porcentaje visual al 100% para la barra circular
  const displayPercentage = Math.min(100, budgetPercentage);
  const isOverBudget = report.totalSpent > report.totalBudget;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Gastos Totales */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col justify-center">
        <div className="flex items-center gap-3 text-muted mb-2">
          <IoTrendingDown className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Gastos Totales
          </span>
        </div>
        <h2 className="text-2xl font-black text-main truncate">
          {formatCurrency(report.totalSpent)}
        </h2>
      </div>

      {/* Presupuesto Total */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col justify-center">
        <div className="flex items-center gap-3 text-muted mb-2">
          <IoWallet className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Presupuesto
          </span>
        </div>
        <h2 className="text-2xl font-black text-main truncate">
          {formatCurrency(report.totalBudget)}
        </h2>
      </div>

      {/* Gasto Promedio */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col justify-center">
        <div className="flex items-center gap-3 text-muted mb-2">
          <IoCash className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Promedio Diario
          </span>
        </div>
        <h2 className="text-2xl font-black text-main truncate">
          {formatCurrency(report.averageSpend)}
        </h2>
      </div>

      {/* Estado del Presupuesto (Gráfica) */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
            Estado
          </span>
          <p
            className={`text-sm font-bold ${isOverBudget ? "text-danger" : "text-primary"}`}
          >
            {isOverBudget ? "Excedido" : "Bajo Control"}
          </p>
        </div>
        <div className="w-18 h-18 shrink-0">
          <CircularProgressbar
            value={displayPercentage}
            text={`${Math.round(budgetPercentage)}%`}
            styles={buildStyles({
              pathColor: isOverBudget ? "var(--danger)" : "var(--primary)",
              textColor: "var(--text-main)",
              trailColor: "var(--border)",
              textSize: "24px",
            })}
          />
        </div>
      </div>
    </div>
  );
}
