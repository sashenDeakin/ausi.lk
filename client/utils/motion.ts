import { Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

export const fadeIn = (direction: Direction, delay: number): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring", // this is a literal, matches Variants
        duration: 1.25,
        delay,
        // no ease for spring
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren: string,
  delayChildren: string
) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const slideIn = (
  direction: string,
  type: string,
  delay: string,
  duration: number
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const textVariant = (delay: number): Variants => {
  return {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring", // correct literal type
        duration: 1.25,
        delay,
      },
    },
  };
};

export const scale = (delay: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay,
      },
    },
  };
};
