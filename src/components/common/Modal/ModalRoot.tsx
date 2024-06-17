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

interface ModalRootProps extends ModalProps {
  disableDimmed?: boolean;
}

export const ModalRoot = ({
  children,
  isOpen = false,
  close,
  disableDimmed
}: PropsWithChildren<ModalRootProps>) => {
  const floatingOverlayType = disableDimmed ? "default" : "dimmed";

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <ModalProvider onClose={close}>
            <FloatingOverlay type={floatingOverlayType} animate lockScroll />
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
