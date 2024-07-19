import { Modal, type ModalProps } from "components/common/Modal";

const AlertAlreadySelectedModal = ({ isOpen, close }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content>
        <Modal.Title title="다시 선택해 주세요" subtitle="다른 선생님이 선택한 강아지가 있어요" />
        <Modal.Button actionText="닫기" actionFn={close} />
      </Modal.Content>
    </Modal>
  );
};

export default AlertAlreadySelectedModal;
