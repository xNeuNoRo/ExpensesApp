"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/shared/Modal";
import CategoryForm from "../CategoryForm";
import { useCreateCategory } from "@/hooks/categories";

export default function CreateCategoryModal() {
  // Extraemos el router y los search params para controlar la apertura del modal
  const router = useRouter();
  const searchParams = useSearchParams();
  // Extraemos el valor de la accion de la url
  const action = searchParams.get("action");
  // El modal de creación de categoría solo se muestra si la acción en los parámetros de búsqueda es "create-category"
  const isOpen = action === "create-category";

  // Usamos el hook de mutación para crear una nueva categoría
  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory();

  // Función para cerrar el modal, que simplemente navega a la página de categorías sin parámetros
  const closeModal = () => router.push("/categories", { scroll: false });

  return (
    <Modal title="Nueva Categoría" open={isOpen} close={closeModal}>
      <CategoryForm
        onSubmit={(data) => {
          createCategory(data, {
            onSuccess: () => closeModal(),
          });
        }}
        isLoading={isCreatingCategory}
      />
    </Modal>
  );
}
