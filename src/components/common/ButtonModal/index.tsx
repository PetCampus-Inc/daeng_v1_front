import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, memo } from "react";

import ModalButton from "./ModalButton";
import ModalContent from "./ModalContent";
import ModalTitle from "./ModalTitle";
import { ModalProvider } from "./provider";
import { BackDrop, StyledModal } from "./styles";
import Portal from "../Portal";

export interface IModalProps {
  isOpen?: boolean;
  close: () => void;
  className?: string;
}

interface IModal extends React.MemoExoticComponent<React.FC<PropsWithChildren<IModalProps>>> {
  Content: typeof ModalContent;
  Button: typeof ModalButton;
  Title: typeof ModalTitle;
}

const BaseButtonModal = ({
  children,
  isOpen = false,
  close,
  className
}: PropsWithChildren<IModalProps>) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

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
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: 0.2 }}
            />
            <StyledModal
              initial="initial"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              transition={{ duration: 0.2 }}
              className={className}
            >
              {children}
            </StyledModal>
          </ModalProvider>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const Modal = memo(BaseButtonModal) as IModal;

Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Button = ModalButton;

export default Modal;
