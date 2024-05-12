import Modal from "components/common/ButtonModal";

type BasicModalProps = {
  isOpen: boolean;
  close: () => void;
  action: () => void;
  title: string;
  subtitle?: string;
  closeText: string;
  actionText: string;
  colorScheme?: "primary" | "red";
  children?: React.ReactNode; // TODO: Fix children type
};

const BasicModal = ({
  close,
  isOpen,
  title,
  subtitle,
  closeText,
  actionText,
  action,
  colorScheme,
  children
}: BasicModalProps) => {
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

BasicModal.defaultProps = {
  colorScheme: "primary"
};
