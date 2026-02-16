import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUiSlice, UiSliceType } from "./uiSlice";

// Tienda global de la aplicación, combinamos todos los slices aquí
export const useAppStore = create<UiSliceType>()(
  devtools((...args) => ({
    ...createUiSlice(...args),
  })),
);
