import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUiSlice, UiSliceType } from "./uiSlice";
import { createExpenseSlice, ExpenseSliceType } from "./expenseSlice";

// Tienda global de la aplicación, combinamos todos los slices aquí
export const useAppStore = create<UiSliceType & ExpenseSliceType>()(
  devtools((...args) => ({
    ...createUiSlice(...args),
    ...createExpenseSlice(...args),
  })),
);
