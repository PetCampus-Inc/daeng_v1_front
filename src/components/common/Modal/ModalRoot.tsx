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
  disablePropagation?: boolean;
}

export const ModalRoot = ({
  children,
  isOpen = false,
  close,
  disableDimmed,
  disablePropagation
}: PropsWithChildren<ModalRootProps>) => {
  const floatingOverlayType = disableDimmed ? "default" : "dimmed";
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disablePropagation) {
      e.stopPropagation();
    }
  };

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <ModalProvider onClose={close}>
            <FloatingOverlay
              type={floatingOverlayType}
              animate
              lockScroll
              onMouseDown={handleMouseDown}
            />
            <StyledModal
              role="dialog"
              initial="initial"
              animate="visible"
              exit="hidden"
              variants={modalAnimationVariants}
              transition={{ duration: 0.2 }}
              onMouseDown={handleMouseDown}
            >
              {children}
            </StyledModal>
          </ModalProvider>
        )}
      </AnimatePresence>
    </Portal>
  );
};
