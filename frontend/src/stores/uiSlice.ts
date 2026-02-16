import { StateCreator } from "zustand";

// Este slice se encarga de manejar el estado de la UI, como el sidebar, modales, etc.
export type UiSliceType = {
  ui: {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
  };
};

// Creamos el slice de UI con las funciones para abrir/cerrar/toggle el sidebar
export const createUiSlice: StateCreator<UiSliceType> = (set) => ({
  ui: {
    isSidebarOpen: false,
    toggleSidebar: () =>
      set((state) => ({
        ui: { ...state.ui, isSidebarOpen: !state.ui.isSidebarOpen },
      })),
    closeSidebar: () =>
      set((state) => ({ ui: { ...state.ui, isSidebarOpen: false } })),
    openSidebar: () =>
      set((state) => ({ ui: { ...state.ui, isSidebarOpen: true } })),
  },
});
