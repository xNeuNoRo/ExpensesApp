"use client";

import { type CreateCategoryFormData, type Category } from "@/schemas/category";
import ErrorMessage from "@/components/shared/ErrorMessage";
import IconPicker from "../shared/IconPicker";
import { useCategoryForm } from "@/hooks/shared/useCategoryForm";
import NameValidationFeedback from "./NameValidationFeedback";

type CategoryFormProps = {
  initialData?: Category;
  onSubmit: (data: CreateCategoryFormData) => void;
  isLoading?: boolean;
};

export default function CategoryForm({
  initialData,
  onSubmit,
  isLoading,
}: Readonly<CategoryFormProps>) {
  // Usamos el hook para obtener toda la lógica
  const {
    formId,
    register,
    setValue,
    errors,
    values,
    validation,
    handleSubmit,
  } = useCategoryForm({ initialData, onSubmit });

  // Determinar el texto del boton de envio segun el estado del formulario
  let buttonText = "Crear Categoría";
  if (isLoading) {
    buttonText = "Guardando...";
  } else if (initialData) {
    buttonText = "Actualizar Categoría";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Campo: Nombre de la Categoría */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label
            htmlFor={`${formId}-name`}
            className="text-sm font-semibold text-main"
          >
            Nombre
          </label>

          {/* Feedback Visual de Validación */}
          <NameValidationFeedback
            shouldValidate={validation.shouldValidate}
            isValidating={validation.isValidating}
            isAvailable={validation.isAvailable}
          />
        </div>
        <input
          id={`${formId}-name`}
          type="text"
          placeholder="Ej. Comida, Transporte, Ahorro..."
          className={`block w-full rounded-lg border bg-surface p-2.5 text-sm text-main transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.name ? "border-danger" : "border-border"
          }`}
          {...register("name")}
        />
        {errors.name?.message && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      {/* Campo: Presupuesto Mensual */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${formId}-budget`}
          className="text-sm font-semibold text-main"
        >
          Presupuesto Mensual (DOP)
        </label>
        <input
          id={`${formId}-budget`}
          type="number"
          step="0.01"
          className={`block w-full rounded-lg border bg-surface p-2.5 text-sm text-main transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.monthlyBudget ? "border-danger" : "border-border"
          }`}
          {...register("monthlyBudget", { valueAsNumber: true })}
        />
        {errors.monthlyBudget?.message && (
          <ErrorMessage>{errors.monthlyBudget.message}</ErrorMessage>
        )}
      </div>

      {/* Fila opcional: Color e Icono */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${formId}-color`}
            className="text-sm font-semibold text-main"
          >
            Color (Opcional)
          </label>
          <div className="flex items-center gap-2">
            <input
              id={`${formId}-color`}
              type="color"
              value={values.color}
              onChange={(e) =>
                setValue("color", e.target.value, { shouldValidate: true })
              }
              className="h-10 w-14 cursor-pointer rounded border border-border bg-surface p-1"
            />
            <input
              type="text"
              placeholder="#000000"
              className="block w-full rounded-lg border border-border bg-surface p-2.5 text-sm text-main focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              {...register("color")}
            />
          </div>
        </div>

        {/* Campo: Icon Key */}
        <div className="flex flex-col gap-2">
          <IconPicker
            value={values.iconKey ?? undefined} // Convertimos null a undefined si es necesario
            onChange={(val) =>
              setValue("iconKey", val, { shouldValidate: true })
            }
            error={errors.iconKey?.message}
          />
          {errors.iconKey?.message && (
            <ErrorMessage>{errors.iconKey.message}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={
          !!(
            isLoading || // Deshabilitado si el formulario está en estado de carga
            validation.isValidating || // Deshabilitado si estamos validando el nombre
            (validation.shouldValidate && validation.isAvailable === false) // Deshabilitado si el nombre no es válido
          )
        }
        className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>
    </form>
  );
}
