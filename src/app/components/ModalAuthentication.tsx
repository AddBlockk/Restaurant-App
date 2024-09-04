import React, {
  useRef,
  useEffect,
  useState,
  ComponentPropsWithoutRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  modalVariants,
  backgroundVariants,
} from "../../../animations/animations";

interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalAuthentication({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {animate && (
        <motion.div
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10 px-10"
          onClick={handleClose}
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative bg-white p-10 rounded-lg shadow-xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default ModalAuthentication;
