import { useAppStore } from "@/stores/useAppStore";

// Este hook es un wrapper para acceder al estado de la UI desde cualquier componente
// Evita tener que importar el store y el slice cada vez
export function useUi() {
  const {
    ui: {
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
      openSidebar,
      isIconPickerOpen,
      toggleIconPicker,
      closeIconPicker,
    },
  } = useAppStore();

  return {
    // Sidebar
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,

    // Icon picker
    isIconPickerOpen,
    toggleIconPicker,
    closeIconPicker,
  };
}
