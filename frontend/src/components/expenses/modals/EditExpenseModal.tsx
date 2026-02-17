"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/shared/Modal";
import ExpenseForm from "../ExpenseForm";
import { useExpense, useUpdateExpense } from "@/hooks/expenses";
import { useQueryString } from "@/hooks/shared/useQueryString";

export default function EditExpenseModal() {
  // Hook personalizado para manejar la generación de URLs con query strings en Next.js
  const { createUrl } = useQueryString();

  // Extraemos el router y los search params para controlar la apertura del modal
  const router = useRouter();
  const searchParams = useSearchParams();
  // Extraemos el valor de la accion de la url y el id del gasto a modificar
  const action = searchParams.get("action");
  const expenseId = searchParams.get("expenseId");
  // Determinamos si el modal de edición debe estar abierto,
  // solo si la acción es "edit-expense" y tenemos un ID de gasto válido
  const openModal = !!(action === "edit-expense" && expenseId);

  // Usamos el hook de mutación para crear un nuevo gasto
  const { mutate: updateExpense, isPending: isUpdatingExpense } =
    useUpdateExpense();

  // Función para cerrar el modal, que simplemente elimina los parámetros de la URL para cerrar el modal
  const closeModal = () => {
    const newUrl = createUrl({
      action: null,
      expenseId: null,
    });
    router.replace(newUrl, { scroll: false });
  };

  // Usamos el hook de consulta para obtener los datos del gasto a editar
  const { data: expenseToEdit, isLoading: isLoadingExpense } = useExpense(
    openModal ? expenseId || "" : "",
  );

  return (
    <>
      {/* Modal de Edición */}
      <Modal title="Editar Gasto" open={openModal} close={closeModal}>
        {isLoadingExpense ? (
          <div className="py-10 text-center text-muted">Cargando...</div>
        ) : (
          <ExpenseForm
            initialData={expenseToEdit}
            onSubmit={(data) => {
              if (expenseId) {
                updateExpense(
                  { ...data, id: expenseId },
                  {
                    onSuccess: () => {
                      closeModal();
                    },
                  },
                );
              }
            }}
            isLoading={isUpdatingExpense}
          />
        )}
      </Modal>
    </>
  );
}
