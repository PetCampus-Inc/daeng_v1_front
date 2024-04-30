import Modal, { IModalProps } from "..";

interface Props extends IModalProps {
  action: () => void; // 나가기 액션!
  title: string;
  subtitle: string;
  closeText: string;
  actionText: string;
}

const NormalModal = ({ isOpen, close, action, title, subtitle, closeText, actionText }: Props) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content>
        <Modal.Title title={title} subtitle={subtitle} />
        <Modal.Button
          closeText={closeText}
          closeFn={close}
          actionText={actionText}
          actionFn={action}
        />
      </Modal.Content>
    </Modal>
  );
};

export default NormalModal;
