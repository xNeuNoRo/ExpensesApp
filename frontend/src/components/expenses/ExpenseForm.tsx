"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExpenseSchema,
  type CreateExpenseFormData,
  type Expense,
} from "@/schemas/expense";
import CategorySelect from "@/components/shared/CategorySelect";
import ErrorMessage from "@/components/shared/ErrorMessage";

type ExpenseFormProps = {
  initialData?: Expense;
  onSubmit: (data: CreateExpenseFormData) => void;
  isLoading?: boolean;
};

export default function ExpenseForm({
  initialData,
  onSubmit,
  isLoading,
}: Readonly<ExpenseFormProps>) {
  // Generamos un ID único para el formulario, que se usará para asociar labels e inputs de manera accesible.
  const formId = useId();

  // Configuramos react-hook-form con zod para validación,
  // y establecemos los valores por defecto si se proporciona initialData (para edición).
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateExpenseFormData>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          amount: initialData.amount,
          date: initialData.date.split("T")[0], // Ajuste para input type="date"
          categoryId: initialData.categoryId,
        }
      : {
          amount: 0,
          date: new Date().toISOString().split("T")[0],
        },
  });

  const categoryIdValue = watch("categoryId");

  // Determinar el texto del boton de envio segun el estado del formulario
  let buttonText = "Registrar Gasto";
  if (isLoading) {
    buttonText = "Guardando...";
  } else if (initialData) {
    buttonText = "Actualizar Gasto";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Campo: Nombre del Gasto */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${formId}-name`}
          className="text-sm font-semibold text-main"
        >
          Nombre del Gasto
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          placeholder="Ej. Compra de supermercado"
          className={`block w-full rounded-lg border bg-surface p-2.5 text-sm text-main transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.name ? "border-danger" : "border-border"
          }`}
          {...register("name")}
        />
        {errors.name?.message && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      {/* Campo: Descripción */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${formId}-desc`}
          className="text-sm font-semibold text-main"
        >
          Descripción
        </label>
        <textarea
          id={`${formId}-desc`}
          rows={3}
          placeholder="Detalles adicionales..."
          className={`block w-full rounded-lg border bg-surface p-2.5 text-sm text-main transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.description ? "border-danger" : "border-border"
          }`}
          {...register("description")}
        />
        {errors.description?.message && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Campo: Monto */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${formId}-amount`}
            className="text-sm font-semibold text-main"
          >
            Monto (DOP)
          </label>
          <input
            id={`${formId}-amount`}
            type="number"
            step="0.01"
            className={`block w-full rounded-lg border bg-surface p-2.5 text-sm text-main transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.amount ? "border-danger" : "border-border"
            }`}
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount?.message && (
            <ErrorMessage>{errors.amount.message}</ErrorMessage>
          )}
        </div>

        {/* Campo: Fecha */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${formId}-date`}
            className="text-sm font-semibold text-main"
          >
            Fecha
          </label>
          <input
            id={`${formId}-date`}
            type="date"
            className={`block w-full rounded-lg border bg-surface p-2.5 text-sm text-main transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.date ? "border-danger" : "border-border"
            }`}
            {...register("date")}
          />
          {errors.date?.message && (
            <ErrorMessage>{errors.date.message}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Selector de Categoría (Reutilizable) */}
      <CategorySelect
        value={categoryIdValue}
        onChange={(val) =>
          setValue("categoryId", val, { shouldValidate: true })
        }
        error={errors.categoryId?.message}
      />

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90  hover:cursor-pointer disabled:opacity-50"
      >
        {buttonText}
      </button>
    </form>
  );
}
