import { Modal, type ModalProps } from "components/common/Modal";

type AttendanceCloseModalProps = {
  action: () => void;
} & ModalProps;

export function AttendanceCloseModal({ close, action, isOpen }: AttendanceCloseModalProps) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two-button">
        <Modal.Title
          title="출석을 중단하고 싶으신가요?"
          subtitle="진행중이던 출석 내용이 모두 초기화됩니다"
        />
        <Modal.Button closeText="닫기" actionText="중단" actionFn={action} />
      </Modal.Content>
    </Modal>
  );
}
