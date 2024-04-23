import Modal, { IModalProps } from "..";

interface Props extends IModalProps {
  action: () => void; // 나가기 액션!
}

const PreventLeaveModal = ({ isOpen, close, action }: Props) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content>
        <Modal.Title
          title="페이지를 나가시겠습니까?"
          subtitle="페이지를 벗어날 경우 입력한 정보가 초기화됩니다"
        />
        <Modal.Button closeText="나가기" closeFn={action} actionText="머무르기" actionFn={close} />
      </Modal.Content>
    </Modal>
  );
};

export default PreventLeaveModal;
