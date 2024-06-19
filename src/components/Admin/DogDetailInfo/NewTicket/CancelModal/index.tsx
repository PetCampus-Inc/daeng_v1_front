import { Modal, type ModalProps } from "components/common/Modal";
import { useNavigate } from "react-router-dom";

const CancelModal = ({ isOpen, close }: ModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two-button">
        <Modal.Title
          title="페이지를 나가고 싶으신가요?"
          subtitle="페이지를 벗어날 경우 입력한 정보가 초기화 돼요"
        />
        <Modal.Button
          closeText="나가기"
          actionText="머무르기"
          actionFn={close}
          closeFn={() => {
            navigate(-1);
          }}
        />
      </Modal.Content>
    </Modal>
  );
};

export default CancelModal;
