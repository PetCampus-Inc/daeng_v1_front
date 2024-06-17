import type { ReactNode } from "react";

import { Modal, type ModalProps } from "../index";

import type { ModalButtonProps } from "../ModalButton";
import type { ModalTitleProps } from "../ModalTitle";

interface BasicModalProps
  extends ModalProps,
    Omit<ModalButtonProps, "title">,
    Pick<ModalTitleProps, "title"> {
  children?: ReactNode; // TODO: Fix children type
  subtitle?: string;
}

export const BasicModal = ({
  close,
  isOpen,
  title,
  subtitle,
  closeText,
  actionText,
  actionFn,
  colorScheme = "primary",
  children
}: BasicModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two-button">
        <Modal.Title title={title} subtitle={children ? children : subtitle} />
        <Modal.Button
          colorScheme={colorScheme}
          closeText={closeText}
          actionText={actionText}
          actionFn={actionFn}
        />
      </Modal.Content>
    </Modal>
  );
};
