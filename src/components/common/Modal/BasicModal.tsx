import Modal from "components/common/ButtonModal";

type DisconnectModalProps = {
  // TODO: 탈퇴 액션 추가
  isOpen: boolean;
  close: () => void;
  action: () => void;
  title: string;
  subtitle?: string;
  closeText: string;
  actionText: string;
  colorScheme: "primary" | "red";
  children?: React.ReactNode;
};

const BasicModal = ({
  close,
  action,
  isOpen,
  title,
  subtitle,
  closeText,
  actionText,
  colorScheme,
  children
}: DisconnectModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two">
        <Modal.Title title={title} subtitle={children ? children : subtitle} />
        <Modal.Button
          colorScheme={colorScheme}
          closeText={closeText}
          actionText={actionText}
          actionFn={action}
        />
      </Modal.Content>
    </Modal>
  );
};

export default BasicModal;
