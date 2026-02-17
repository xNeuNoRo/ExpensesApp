"use client";

import classNames from "@/helpers/classNames";
import { ReactNode } from "react";

export type StatItem = {
  label: string;
  value: string | number | ReactNode;
  // Opcionales para controlar el estilo
  variant?: "default" | "highlight";
  hiddenOnMobile?: boolean;
};

type StatsBarProps = {
  items: StatItem[];
  className?: string;
};

export default function StatsBar({
  items,
  className = "",
}: Readonly<StatsBarProps>) {
  if (!items.length) return null;

  return (
    <div
      className={`flex justify-end animate-in fade-in slide-in-from-bottom-2 ${className}`}
    >
      <div className="inline-flex items-stretch divide-x divide-border rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        {items.map((item, index) => {
          const isHighlight = item.variant === "highlight";

          return (
            <div
              key={item.label + index}
              className={classNames(
                item.hiddenOnMobile ? "hidden sm:flex" : "flex",
                isHighlight
                  ? "px-6 items-end bg-primary/5 min-w-35" // Estilo destacado
                  : "px-5 items-center min-w-25 bg-surface", // Estilo normal
                "flex flex-col justify-center py-3",
              )}
            >
              <span
                className={classNames(
                  isHighlight ? "text-primary/80" : "text-muted",
                  "text-[10px] font-bold uppercase tracking-wider",
                )}
              >
                {item.label}
              </span>
              <span
                className={classNames(
                  isHighlight ? "text-primary" : "text-main",
                  "text-lg font-bold tabular-nums",
                )}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
