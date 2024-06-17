import { AnimatePresence } from "framer-motion";
import { type PropsWithChildren } from "react";
import { dimmerAnimationVariants } from "styles/animation";

import { ModalProvider } from "./ModalContext";
import { BackDrop, StyledModal } from "./styles";
import Portal from "../Portal";

export interface ModalProps {
  isOpen?: boolean;
  close: () => void;
}

export const ModalRoot = ({ children, isOpen = false, close }: PropsWithChildren<ModalProps>) => {
  const modalVariants = {
    initial: { y: "-50%", x: "-50%", opacity: 0.5 },
    hidden: { y: "-50%", x: "-50%", opacity: 0 },
    visible: { y: "-60%", x: "-50%", opacity: 1 }
  };

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <ModalProvider onClose={close}>
            <BackDrop
              key="dimmer"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dimmerAnimationVariants}
              aria-hidden="true"
            />
            <StyledModal
              initial="initial"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              transition={{ duration: 0.2 }}
            >
              {children}
            </StyledModal>
          </ModalProvider>
        )}
      </AnimatePresence>
    </Portal>
  );
};
