"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/shared/Modal";
import ExpenseForm from "../ExpenseForm";
import { useCreateExpense } from "@/hooks/expenses";

export default function CreateExpenseModal() {
  // Extraemos el router y los search params para controlar la apertura del modal
  const router = useRouter();
  const searchParams = useSearchParams();
  // Extraemos el valor de la accion de la url
  const action = searchParams.get("action");
  // El modal de creación de gasto solo se muestra si la acción en los parámetros de búsqueda es "create-expense"
  const isOpen = action === "create-expense";

  // Usamos el hook de mutación para crear un nuevo gasto
  const { mutate: createExpense, isPending: isCreatingExpense } =
    useCreateExpense();

  // Función para cerrar el modal, que simplemente navega a la raíz del dashboard sin parámetros
  const closeModal = () => {
    router.push("/", { scroll: false });
  };

  return (
    <Modal title="Registrar Nuevo Gasto" open={isOpen} close={closeModal}>
      <ExpenseForm
        onSubmit={(data) => {
          createExpense(data, {
            onSuccess: () => {
              closeModal();
            },
          });
        }}
        isLoading={isCreatingExpense}
      />
    </Modal>
  );
}
