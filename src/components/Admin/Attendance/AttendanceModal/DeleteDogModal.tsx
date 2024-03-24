import Modal, { type IModalProps } from "components/common/ButtonModal";

type DeleteDogModalProps = {
  action: () => void;
} & IModalProps;

const DeleteDogModal = ({ close, action, isOpen }: DeleteDogModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two">
        <Modal.Title
          title="정말 삭제하시겠습니까?"
          subtitle="모든 데이터가 초기화되고 가입이 탈퇴됩니다"
        />
        <Modal.Button closeText="닫기" actionText="중단" actionFn={action} />
      </Modal.Content>
    </Modal>
  );
};

export default DeleteDogModal;
