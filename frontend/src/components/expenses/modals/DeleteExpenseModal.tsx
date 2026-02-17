"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Modal from "@/components/shared/Modal";
import { useExpense, useDeleteExpense } from "@/hooks/expenses";
import { IoWarning } from "react-icons/io5";

export default function DeleteExpenseModal() {
  // Extraemos el router y los search params para controlar la apertura del modal
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Extraemos el valor de la accion de la url y el id del gasto a modificar
  const action = searchParams.get("action");
  const expenseId = searchParams.get("expenseId");
  // Determinamos si el modal de edición debe estar abierto,
  // solo si la acción es "edit-expense" y tenemos un ID de gasto válido
  const openModal = !!(action === "delete-expense" && expenseId);

  // Usamos el hook de mutación para crear un nuevo gasto
  const { mutate: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();

  // Función para manejar la eliminación del gasto,
  // que llama a la mutación de eliminación
  const handleDelete = () => {
    if (!expenseId) return;
    deleteExpense(expenseId, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  // Función para cerrar el modal, que simplemente elimina los parámetros de la URL para cerrar el modal
  const closeModal = () => {
    router.replace(pathname, { scroll: false });
  };

  // Usamos el hook de consulta para obtener los datos del gasto a editar
  const { data: expenseToDelete, isLoading: isLoadingExpense } = useExpense(
    openModal ? expenseId || "" : "",
  );

  return (
    <>
      {/* Modal de Confirmacion para borrar */}
      <Modal
        title="Confirmar Eliminación"
        open={action === "delete-expense"}
        close={closeModal}
        size="small"
      >
        {isLoadingExpense ? (
          <div className="py-10 text-center text-muted">Cargando...</div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg bg-danger/10 p-4 text-danger">
              <IoWarning className="h-8 w-8 shrink-0" />
              <p className="text-sm font-medium">
                ¿Estás seguro de que deseas eliminar el gasto{" "}
                <span className="font-bold underline">
                  &quot;{expenseToDelete?.name ?? "Cargando..."}&quot;
                </span>{" "}
                ? Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={closeModal}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-main hover:bg-surface hover:cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeletingExpense}
                className="rounded-lg bg-danger px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-danger/90 hover:cursor-pointer transition-all disabled:opacity-50"
              >
                {isDeletingExpense ? "Eliminando..." : "Sí, eliminar gasto"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
