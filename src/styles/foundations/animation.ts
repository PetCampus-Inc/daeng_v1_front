import { Variants } from "framer-motion";

export const dimmedAnimationVariants = {
  initial: { opacity: 0, transition: { duration: 0.15 } },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

export const modalAnimationVariants = {
  initial: { y: "-50%", x: "-50%", opacity: 0.5 },
  hidden: { y: "-50%", x: "-50%", opacity: 0 },
  visible: { y: "-60%", x: "-50%", opacity: 1 }
};

export const bottomSheetTransition = {
  type: "tween",
  duration: 0.5,
  ease: [0.4, 0.72, 0, 1]
};

export const bottomSheetAnimationVariants: Variants = {
  animate: {
    y: 0,
    transition: bottomSheetTransition,
    willChange: "y"
  },
  exit: {
    y: "110%",
    transition: bottomSheetTransition,
    willChange: "y"
  },
  initial: {
    y: "100%",
    transition: bottomSheetTransition,
    willChange: "y"
  }
};

export const accordionTransition = { type: "tween", duration: 0.3, ease: [0.4, 0, 0.2, 1] };

export const dialogTransition = {
  opacity: { duration: 0.15 },
  transform: {
    duration: 0.25,
    type: "tween",
    ease: [0.32, 0.72, 0, 1]
  }
};

export const dialogAnimationVariants: Variants = {
  animate: {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
    transition: dialogTransition
  },
  exit: {
    opacity: 0,
    transform: "translate3d(0, 10px, 0) scale3d(0.95, 0.95, 0.95)",
    transition: dialogTransition
  },
  initial: {
    opacity: 1,
    transform: "translate3d(0, -10px, 0) scale3d(0.95, 0.95, 0.95)",
    transition: dialogTransition
  }
};

const enterArrowTransition = {
  type: "tween",
  duration: 0.225,
  ease: [0.4, 0, 0.2, 1]
};

const exitArrowTransition = {
  type: "tween",
  duration: 0.195,
  ease: [0.4, 0, 0.2, 1]
};

export const arrowVariants = {
  visible: { opacity: 1, scale: 1, transition: enterArrowTransition },
  hidden: { opacity: 0, scale: 0, transition: exitArrowTransition }
};
