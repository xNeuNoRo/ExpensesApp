"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  header?: ReactNode;
  title: string;
  size?: "small" | "medium" | "large";
  open: boolean;
  close: () => void;
  children: ReactNode;
};

const sizeClasses = {
  small: "max-w-xl",
  medium: "max-w-2xl",
  large: "max-w-4xl",
};

export default function Modal({
  header,
  title,
  size = "medium",
  open,
  close,
  children,
}: Readonly<ModalProps>) {
  // Usamos un estado local para controlar el montaje del componente y evitar problemas con el SSR
  const [mounted, setMounted] = useState(false);

  // Usamos useEffect para marcar el componente
  // como montado después del primer renderizado, lo que permite que el Modal funcione correctamente con SSR
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Si el componente no está montado, no renderizamos nada para evitar problemas con el SSR
  if (!mounted) return null;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
            >
              <DialogPanel
                className={`w-full ${sizeClasses[size]} transform rounded-2xl bg-background p-8 text-left align-middle shadow-xl transition-all border border-border`}
              >
                {/* Header superior: Botón de cerrar integrado */}
                <div className="flex items-start justify-between">
                  {header}
                  <DialogTitle
                    as="h3"
                    className={`text-2xl font-bold text-main font-display truncate ${
                      header ? "mt-4" : ""
                    }`}
                  >
                    {title}
                  </DialogTitle>
                  <button
                    onClick={close}
                    className="ml-4 rounded-full p-1 text-muted hover:bg-surface hover:text-main hover:cursor-pointer transition-colors"
                  >
                    <IoClose className="h-6 w-6" />
                  </button>
                </div>

                {/* Contenido del Modal */}
                <div className="mt-6">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
