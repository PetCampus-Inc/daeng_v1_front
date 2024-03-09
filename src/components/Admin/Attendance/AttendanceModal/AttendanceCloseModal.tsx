import Modal from "components/common/ButtonModal";

type AttendanceCloseModalProps = {
  isOpen: boolean;
  close: () => void;
  action: () => void;
};

const AttendanceCloseModal = ({ close, action, isOpen }: AttendanceCloseModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Content variant="two">
        <Modal.Title
          title="출석을 중단하고 싶으신가요?"
          subtitle="진행중이던 출석 내용이 모두 초기화됩니다"
        />
        <Modal.Button closeText="닫기" actionText="중단" actionFn={action} />
      </Modal.Content>
    </Modal>
  );
};

export default AttendanceCloseModal;
