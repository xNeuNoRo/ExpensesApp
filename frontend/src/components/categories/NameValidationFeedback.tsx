import { IoCheckmarkCircle, IoCloseCircle, IoReload } from "react-icons/io5";

type NameValidationFeedbackProps = {
  shouldValidate?: string | boolean | null;
  isValidating: boolean;
  isAvailable?: boolean;
};

export default function NameValidationFeedback({
  shouldValidate,
  isValidating,
  isAvailable,
}: Readonly<NameValidationFeedbackProps>) {
  if (!shouldValidate) return null;

  if (isValidating) {
    return (
      <span className="text-muted flex items-center gap-1 text-xs font-medium animate-in fade-in">
        <IoReload className="animate-spin" /> Verificando...
      </span>
    );
  }
  if (isAvailable) {
    return (
      <span className="text-success flex items-center gap-1 text-xs font-medium animate-in fade-in">
        <IoCheckmarkCircle /> Disponible
      </span>
    );
  }
  return (
    <span className="text-danger flex items-center gap-1 text-xs font-medium animate-in fade-in">
      <IoCloseCircle /> No disponible
    </span>
  );
}
