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
      className={classNames(
        "flex justify-end animate-in fade-in slide-in-from-bottom-2 select-none",
        className,
      )}
    >
      <div className="grid grid-cols-2 lg:flex lg:flex-row items-stretch rounded-xl border border-border bg-surface shadow-sm overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-border w-full lg:w-auto">
        {items.map((item, index) => {
          const isHighlight = item.variant === "highlight";

          return (
            <div
              key={item.label + index}
              className={classNames(
                item.hiddenOnMobile ? "hidden sm:flex" : "flex",
                "flex-col justify-center py-3 px-3 lg:px-5 min-w-0 lg:min-w-fit flex-1",
                isHighlight
                  ? "bg-primary/5 items-center lg:items-end lg:px-6"
                  : "bg-surface items-center",
                index % 2 === 0 ? "" : "border-l border-border lg:border-l-0",
              )}
            >
              <span
                className={classNames(
                  isHighlight ? "text-primary/80" : "text-muted",
                  "text-[10px] font-bold uppercase tracking-wider w-full",
                  "whitespace-normal lg:whitespace-nowrap leading-tight",
                  isHighlight
                    ? "text-center lg:text-right"
                    : "text-center lg:text-left",
                )}
              >
                {item.label}
              </span>

              <span
                className={classNames(
                  isHighlight ? "text-primary" : "text-main",
                  "font-bold tabular-nums w-full",
                  "whitespace-normal break-all lg:whitespace-nowrap lg:break-normal",
                  "text-sm lg:text-xl",
                  isHighlight
                    ? "text-center lg:text-right"
                    : "text-center lg:text-left",
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
