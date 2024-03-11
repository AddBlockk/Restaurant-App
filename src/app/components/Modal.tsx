import React, { useRef, useEffect, ComponentPropsWithoutRef } from "react";

interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children, ...props }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backgroundRef.current && event.target === backgroundRef.current) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
      <div
        ref={modalRef}
        className="relative bg-white p-10 rounded-lg shadow-xl w-96">
        {children}
      </div>
    </div>
  );
};

export default Modal;
