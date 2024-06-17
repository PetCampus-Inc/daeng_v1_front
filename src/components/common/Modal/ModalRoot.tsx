import { AnimatePresence } from "framer-motion";
import { type PropsWithChildren } from "react";
import { modalAnimationVariants } from "styles/animation";

import { ModalProvider } from "./ModalContext";
import { StyledModal } from "./styles";
import { FloatingOverlay } from "../FloatingOverlay";
import Portal from "../Portal";

export interface ModalProps {
  isOpen?: boolean;
  close: () => void;
}

export const ModalRoot = ({ children, isOpen = false, close }: PropsWithChildren<ModalProps>) => {
  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <ModalProvider onClose={close}>
            <FloatingOverlay type="dimmed" animate lockScroll />
            <StyledModal
              role="dialog"
              initial="initial"
              animate="visible"
              exit="hidden"
              variants={modalAnimationVariants}
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
