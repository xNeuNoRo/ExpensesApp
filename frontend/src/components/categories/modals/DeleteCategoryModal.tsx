"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/shared/Modal";
import { useCategory, useDeleteCategory } from "@/hooks/categories";
import { IoWarning } from "react-icons/io5";

export default function DeleteCategoryModal() {
  // Extraemos el router y los search params para controlar la apertura del modal
  const router = useRouter();
  const searchParams = useSearchParams();
  // Extraemos el valor de la acción de la URL para determinar si el modal debe abrirse
  const action = searchParams.get("action");
  // Extraemos el ID de la categoría a editar de los parámetros de búsqueda
  const categoryId = searchParams.get("categoryId");

  // El modal de eliminación de categoría solo se muestra
  // si la acción en los parámetros de búsqueda es "delete-category" y hay un ID de categoría válido
  const isOpen = !!(action === "delete-category" && categoryId);

  // Usamos el hook de mutación para eliminar la categoría
  const { mutate: deleteCategory, isPending: isDeletingCategory } =
    useDeleteCategory();

  // Solo cargamos datos si el modal está abierto y hay ID
  const { data: category, isLoading } = useCategory(
    isOpen ? categoryId || "" : "",
  );

  // Función para cerrar el modal, que simplemente navega a la página de categorías sin parámetros
  const closeModal = () => router.push("/categories", { scroll: false });

  // Función para manejar la eliminación de la categoría, que llama a la mutación de eliminación
  const handleDelete = () => {
    if (categoryId) {
      deleteCategory(categoryId, {
        onSuccess: () => closeModal(),
      });
    }
  };

  return (
    <Modal
      title="Eliminar Categoría"
      open={isOpen}
      close={closeModal}
      size="small"
    >
      {isLoading ? (
        <div className="py-8 text-center text-muted">Cargando...</div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start gap-4 rounded-lg bg-danger/10 p-4 text-danger">
            <IoWarning className="h-6 w-6 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">
                ¿Eliminar la categoría{" "}
                <span className="font-bold underline">
                  &quot;{category?.name}&quot;
                </span>{" "}
                ?
              </p>
              <p className="mt-1 opacity-90">
                Esta acción no se puede deshacer. Los gastos asociados podrían
                perder su referencia.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-main hover:bg-surface hover:cursor-pointer transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeletingCategory}
              className="rounded-lg bg-danger px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-danger/90 hover:cursor-pointer transition-all disabled:opacity-50"
            >
              {isDeletingCategory ? "Eliminando..." : "Sí, eliminar"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
