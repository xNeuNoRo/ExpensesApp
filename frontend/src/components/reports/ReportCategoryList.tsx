"use client";

import { CategoryStat } from "@/schemas/expense";
import { formatCurrency } from "@/helpers/formatters";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { IoShapes, IoWarning, IoCheckmarkCircle } from "react-icons/io5";

type ReportCategoryListProps = {
  details: CategoryStat[];
};

export default function ReportCategoryList({
  details,
}: Readonly<ReportCategoryListProps>) {
  // Función para obtener el componente del icono basado en el string que viene de la API
  const getIcon = (iconKey: string) => {
    return CATEGORY_ICONS[iconKey] || IoShapes;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-main px-1">
        Desglose por Categoría
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((category) => {
          const IconComponent = getIcon(category.categoryIcon);
          const percentage = Math.min(100, category.percentage);

          return (
            <div
              key={category.categoryName}
              className="bg-surface p-5 rounded-xl border border-border shadow-sm flex flex-col gap-4"
            >
              {/* Encabezado de la Categoría */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background"
                    style={{ color: category.categoryColor }}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-main leading-none">
                      {category.categoryName}
                    </h4>
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">
                      Presupuesto: {formatCurrency(category.monthlyBudget)}
                    </span>
                  </div>
                </div>

                {/* Indicador de Estado */}
                {category.isOverBudget ? (
                  <IoWarning
                    className="h-5 w-5 text-danger"
                    title="Presupuesto excedido"
                  />
                ) : (
                  <IoCheckmarkCircle
                    className="h-5 w-5 text-primary"
                    title="Dentro del presupuesto"
                  />
                )}
              </div>

              {/* Información de Gastos y Porcentaje */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black text-main tabular-nums">
                    {formatCurrency(category.amountSpent)}
                  </span>
                  <span
                    className={`text-xs font-bold ${category.isOverBudget ? "text-danger" : "text-muted"}`}
                  >
                    {category.percentage.toFixed(1)}%
                  </span>
                </div>

                {/* Barra de Progreso */}
                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      category.isOverBudget ? "bg-danger" : "bg-primary"
                    }`}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: category.isOverBudget
                        ? undefined
                        : category.categoryColor,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {details.length === 0 && (
        <div className="text-center py-12 bg-surface rounded-xl border border-dashed border-border">
          <p className="text-muted text-sm">
            No hay movimientos registrados para este periodo.
          </p>
        </div>
      )}
    </div>
  );
}
