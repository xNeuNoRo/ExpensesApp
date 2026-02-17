import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCategorySchema,
  type CreateCategoryFormData,
  type Category,
} from "@/schemas/category";
import { useDebounce } from "@/hooks/shared/useDebounce";
import { useValidateCategoryName } from "@/hooks/categories/useQueries"; // Asegúrate de la ruta correcta

type UseCategoryFormProps = {
  initialData?: Category;
  onSubmit: (data: CreateCategoryFormData) => void;
};

/**
 * @description Hook personalizado para manejar la lógica de un formulario de categoría, tanto para creación como para edición. Proporciona manejo de estado del formulario, validación en tiempo real del nombre de la categoría, y feedback visual para el usuario.
 * @param param0 Un objeto con las propiedades opcionales `initialData`, que es la categoría a editar (si se está editando), y `onSubmit`, que es la función a llamar cuando el formulario se envía con datos válidos.
 * @returns Un objeto con las propiedades necesarias para construir un formulario de categoría, incluyendo el ID del formulario, los métodos de react-hook-form, los errores de validación, los valores actuales del formulario, el estado de validación del nombre, y la función para manejar el envío del formulario.
 */
export function useCategoryForm({
  initialData,
  onSubmit,
}: UseCategoryFormProps) {
  // Generamos un ID único para el formulario, que se usará para asociar labels e inputs de manera accesible.
  const formId = useId();

  // Configuramos react-hook-form con zod para validación,
  // y establecemos los valores por defecto si se proporciona initialData (para edición).
  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(CreateCategorySchema), // Usamos el esquema de validación de categoría para validar los datos del formulario
    defaultValues: initialData // Pasamos los datos iniciales en caso de edición
      ? {
          ...initialData,
          iconKey: initialData.iconKey ?? null,
          color: initialData.color ?? null,
        }
      : {
          name: "",
          monthlyBudget: 0,
          iconKey: null,
          color: null,
        },
  });

  // Extraemos los métodos y el estado de react-hook-form para usarlos en el formulario
  const {
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  // Observamos el valor del campo de nombre para poder validar su disponibilidad en tiempo real
  // eslint-disable-next-line react-hooks/incompatible-library
  const nameValue = watch("name");
  const colorValue = watch("color") || "#000000";
  const iconKeyValue = watch("iconKey");

  // Usamos un hook de debounce para retrasar la validación del nombre hasta que el usuario deje de escribir por 500ms
  // Esto evita hacer demasiadas peticiones a la API mientras el usuario está escribiendo
  const debouncedName = useDebounce(nameValue, 500);

  // Determinamos si deberíamos validar el nombre: solo si tiene al menos 3 caracteres
  const shouldValidate =
    debouncedName &&
    debouncedName.length >= 3 &&
    debouncedName.trim().toLowerCase() !== initialData?.name.toLowerCase();

  // Usamos el hook personalizado para validar si el nombre de categoría está disponible
  const { data: isAvailable, isLoading: isValidating } =
    useValidateCategoryName(shouldValidate ? debouncedName : "");

  // Efecto para mostrar el error de nombre no disponible si la validación indica que no está disponible
  useEffect(() => {
    // Si debemos validar y el nombre no está disponible, mostramos un error manual en el campo de nombre
    if (shouldValidate && isAvailable === false) {
      // Solo establecemos el error si no hay ya un error manual para evitar sobreescribir otros errores de validación
      if (errors.name?.type !== "manual") {
        setError("name", {
          type: "manual",
          message: "Este nombre ya está en uso!",
        });
      }
    }
    // Si el nombre es disponible o no deberíamos validar, limpiamos el error manual si existe
    else if (errors.name?.type === "manual") {
      clearErrors("name");
    }
  }, [isAvailable, shouldValidate, setError, clearErrors, errors.name?.type]);

  // Función para manejar el envío del formulario, que simplemente llama a onSubmit con los datos del formulario
  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    formId,
    form,
    register: form.register,
    setValue: form.setValue,
    errors,
    values: {
      color: colorValue,
      iconKey: iconKeyValue,
      name: nameValue,
    },
    validation: {
      shouldValidate,
      isValidating,
      isAvailable,
    },
    handleSubmit,
  };
}
