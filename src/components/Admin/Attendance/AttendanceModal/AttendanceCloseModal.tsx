import ButtonModal from "components/common/ButtonModal";

type AttendanceCloseModalProps = {
  isOpen: boolean;
  close: () => void;
  action: () => void;
};

const AttendanceCloseModal = ({ close, action, isOpen }: AttendanceCloseModalProps) => {
  return (
    <ButtonModal
      isOpen={isOpen}
      maintext="출석을 중단하고 싶으신가요?"
      subtext="출석을 중단하고 싶으신가요?"
      closebutton="닫기"
      closefunc={close}
      actionbutton="중단"
      actionfunc={action}
    />
  );
};

export default AttendanceCloseModal;
