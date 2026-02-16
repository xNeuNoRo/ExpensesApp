import { useAppStore } from "@/stores/useAppStore";

// Este hook es un wrapper para acceder al estado de la UI desde cualquier componente
// Evita tener que importar el store y el slice cada vez
export function useUi() {
  const {
    ui: { isSidebarOpen, toggleSidebar, closeSidebar, openSidebar },
  } = useAppStore();

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
}
