import Modal, { type IModalProps } from "components/common/ButtonModal";

interface DeleteModal extends IModalProps {
  action: () => void;
}

const DeleteCareDogModal = ({ close, action, isOpen }: DeleteModal) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two">
        <Modal.Title
          title="선택된 강아지들을 삭제하시겠어요?"
          subtitle="선택된 강아지의 오늘 관리 기록은
모두 초기화되고 복구할 수 없어요 "
        />
        <Modal.Button closeText="취소" actionText="삭제" actionFn={action} />
      </Modal.Content>
    </Modal>
  );
};

export default DeleteCareDogModal;
