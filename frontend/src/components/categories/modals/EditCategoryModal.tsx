"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/shared/Modal";
import CategoryForm from "../CategoryForm";
import { useCategory, useUpdateCategory } from "@/hooks/categories";

export default function EditCategoryModal() {
  // Extraemos el router y los search params para controlar la apertura del modal
  const router = useRouter();
  const searchParams = useSearchParams();
  // Extraemos el valor de la acción de la URL para determinar si el modal debe abrirse
  const action = searchParams.get("action");
  // Extraemos el ID de la categoría a editar de los parámetros de búsqueda
  const categoryId = searchParams.get("categoryId");

  // El modal de edición de categoría solo se muestra
  // si la acción en los parámetros de búsqueda es "edit-category" y hay un ID de categoría válido
  const isOpen = !!(action === "edit-category" && categoryId);

  // Usamos el hook de mutación para actualizar la categoría
  const { mutate: updateCategory, isPending: isEditingCategory } =
    useUpdateCategory();

  // Solo cargamos datos si el modal está abierto y hay ID
  const { data: category, isLoading: isLoadingData } = useCategory(
    isOpen ? categoryId || "" : "",
  );

  // Función para cerrar el modal, que simplemente navega a la página de categorías sin parámetros
  const closeModal = () => router.push("/categories", { scroll: false });

  return (
    <Modal title="Editar Categoría" open={isOpen} close={closeModal}>
      {isLoadingData ? (
        <div className="py-10 text-center text-muted">Cargando datos...</div>
      ) : (
        <CategoryForm
          initialData={category}
          onSubmit={(data) => {
            if (categoryId) {
              updateCategory(
                { id: categoryId, ...data },
                {
                  onSuccess: () => closeModal(),
                },
              );
            }
          }}
          isLoading={isEditingCategory}
        />
      )}
    </Modal>
  );
}
