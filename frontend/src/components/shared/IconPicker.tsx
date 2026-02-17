"use client";

import { useId, useRef } from "react";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { IoChevronDown, IoGrid, IoShapes } from "react-icons/io5";
import { useUi } from "@/hooks/store/useUi";
import { useClickOutside } from "@/hooks/shared/useClickOutside";
import classNames from "@/helpers/classNames";

type IconPickerProps = {
  value?: string;
  onChange: (iconKey: string) => void;
  error?: string;
};

export default function IconPicker({
  value,
  onChange,
  error,
}: Readonly<IconPickerProps>) {
  // Obtenemos el estado y las funciones para controlar el dropdown del icon picker desde el store global usando el hook personalizado useUi
  const { isIconPickerOpen, toggleIconPicker, closeIconPicker } = useUi();

  // Generamos un ID único para el selector de iconos, que se usará para asociar labels e inputs de manera accesible.
  const pickerId = useId();

  // Obtenemos el componente de icono correspondiente al valor actual usando el hook personalizado
  const SelectedIcon = value ? (CATEGORY_ICONS[value] ?? IoShapes) : IoShapes;

  // Referencia al contenedor del selector para detectar clics fuera y cerrar el dropdown
  const containerRef = useRef<HTMLDivElement>(null);

  // Usamos el hook personalizado useClickOutside para cerrar el dropdown cuando se hace clic fuera del contenedor
  useClickOutside(containerRef, closeIconPicker);

  // Manejar la selección de un icono: actualizar el valor y cerrar el dropdown
  const handleSelectIcon = (iconKey: string) => {
    onChange(iconKey);
    closeIconPicker();
  };

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label
        htmlFor={`${pickerId}-trigger`}
        className="text-sm font-semibold text-main"
      >
        Icono (Opcional)
      </label>

      <div className="relative">
        {/* Boton que despliega el dropdown */}
        <button
          id={`${pickerId}-trigger`}
          type="button"
          onClick={() => toggleIconPicker()}
          aria-haspopup="listbox"
          aria-expanded={isIconPickerOpen}
          aria-labelledby={`${pickerId}-trigger`}
          className={classNames(
            error ? "border-danger" : "border-border hover:border-primary",
            "relative flex w-full items-center justify-between rounded-lg border bg-surface py-2.5 pl-3 pr-3 text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 hover:cursor-pointer",
          )}
        >
          <div className="flex items-center gap-2 text-main">
            {value ? (
              <>
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
                  <SelectedIcon className="h-3.5 w-3.5" />
                </div>
                <span className="capitalize">{value}</span>
              </>
            ) : (
              <>
                <IoGrid className="h-4 w-4 text-muted" />
                <span className="text-muted">Seleccionar icono...</span>
              </>
            )}
          </div>
          <IoChevronDown
            className={`h-4 w-4 text-muted transition-transform ${
              isIconPickerOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown de los iconos */}
        {isIconPickerOpen && (
          <div className="absolute top-full z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-border bg-background p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95">
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(CATEGORY_ICONS).map(([key, Icon]) => {
                const isSelected = value === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectIcon(key)}
                    className={classNames(
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted hover:bg-surface hover:text-main",
                      "flex aspect-square flex-col items-center justify-center gap-1 rounded-md transition-all hover:cursor-pointer",
                    )}
                    title={key}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs font-medium text-danger">{error}</span>
      )}
    </div>
  );
}
