import Modal, { type IModalProps } from "components/common/ButtonModal";

interface LogoutModal extends IModalProps {
  action: () => void;
}

const LogoutAdminModal = ({ close, action, isOpen }: LogoutModal) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two">
        <Modal.Title title="로그아웃" subtitle="정말 로그아웃하시겠습니까?" />
        <Modal.Button closeText="취소" actionText="로그아웃" actionFn={action} />
      </Modal.Content>
    </Modal>
  );
};

export default LogoutAdminModal;
