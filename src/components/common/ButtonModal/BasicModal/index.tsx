import Modal, { type IModalProps } from "..";

import type { ModalButtonProps } from "../ModalButton";
import type { ModalTitleProps } from "../ModalTitle";

interface Props extends IModalProps, Omit<ModalButtonProps, "title">, ModalTitleProps {
  title: string;
}

const BasicModal = ({
  isOpen,
  close,
  actionFn,
  actionText,
  closeFn,
  closeText,
  title,
  subtitle
}: Props) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content>
        <Modal.Title title={title} subtitle={subtitle} />
        <Modal.Button
          closeText={closeText}
          closeFn={closeFn}
          actionText={actionText}
          actionFn={actionFn}
        />
      </Modal.Content>
    </Modal>
  );
};

export default BasicModal;
