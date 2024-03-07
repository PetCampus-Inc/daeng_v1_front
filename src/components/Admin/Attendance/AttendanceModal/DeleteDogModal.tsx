import ButtonModal from "components/common/ButtonModal";

type DeleteDogModalProps = {
  isOpen: boolean;
  close: () => void;
  action: () => void;
};

const DeleteDogModal = ({ close, action, isOpen }: DeleteDogModalProps) => {
  return (
    <ButtonModal
      isOpen={isOpen}
      maintext="정말 삭제하시겠습니까?"
      subtext="모든 데이터가 초기화되고 가입이 탈퇴됩니다"
      closebutton="닫기"
      closefunc={close}
      actionbutton="중단"
      actionfunc={action}
    />
  );
};

export default DeleteDogModal;
