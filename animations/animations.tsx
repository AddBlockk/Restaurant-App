import { Variants } from "framer-motion";

export const modalVariants: Variants = {
  initial: {
    y: "-100%",
    opacity: 0,
  },
  animate: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

export const backgroundVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  whileInView: { opacity: 1 },
};

export const offer: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  whileInView: { opacity: 1 },
};

// Анимация для Слайдера
export const slider: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  whileInView: { opacity: 1 },
};

export const slideVariants = {
  initial: { opacity: 0.9, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0.5,
    scale: 0.2,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const textVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 2, delay: 0.5, ease: "easeInOut" },
  },
};

export const menu = {
  initial: {
    x: "100%",
  },
  enter: {
    x: "0%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
