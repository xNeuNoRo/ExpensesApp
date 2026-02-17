import { StateCreator } from "zustand";

// Este slice se encarga de manejar el estado de la UI, como el sidebar, modales, etc.
export type UiSliceType = {
  ui: {
    // Estado del sidebar (abierto/cerrado) y funciones para manipularlo
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;

    // Estado del modal de selección de iconos y funciones para manipularlo
    isIconPickerOpen: boolean;
    toggleIconPicker: () => void;
    closeIconPicker: () => void;
  };
};

// Creamos el slice de UI con las funciones para abrir/cerrar/toggle el sidebar
export const createUiSlice: StateCreator<UiSliceType> = (set) => ({
  ui: {
    // Estado y funciones del sidebar
    isSidebarOpen: false,
    toggleSidebar: () =>
      set((state) => ({
        ui: { ...state.ui, isSidebarOpen: !state.ui.isSidebarOpen },
      })),
    closeSidebar: () =>
      set((state) => ({ ui: { ...state.ui, isSidebarOpen: false } })),
    openSidebar: () =>
      set((state) => ({ ui: { ...state.ui, isSidebarOpen: true } })),

    // Estado y funciones del icon picker
    isIconPickerOpen: false,
    toggleIconPicker: () =>
      set((state) => ({
        ui: { ...state.ui, isIconPickerOpen: !state.ui.isIconPickerOpen },
      })),
    closeIconPicker: () =>
      set((state) => ({ ui: { ...state.ui, isIconPickerOpen: false } })),
  },
});
