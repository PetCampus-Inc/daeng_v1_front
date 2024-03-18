import Modal from "components/common/ButtonModal";

interface AlertAlreadySelectedModalProps {
  isOpen: boolean;
  close: () => void;
}

const AlertAlreadySelectedModal = ({ isOpen, close }: AlertAlreadySelectedModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Content variant="one">
        <Modal.Title title="다시 선택해 주세요" subtitle="다른 선생님이 선택한 강아지가 있어요" />
        <Modal.Button actionText="닫기" actionFn={close} />
      </Modal.Content>
    </Modal>
  );
};

export default AlertAlreadySelectedModal;
