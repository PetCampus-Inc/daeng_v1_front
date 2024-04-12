import Modal from "components/common/ButtonModal";

type DisconnectModalProps = {
  // 탈퇴 액션 추가
  isOpen: boolean;
  close: () => void;
  action: () => void;
};

const DisconnectModal = ({ close, action, isOpen }: DisconnectModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Content variant="two">
        <Modal.Title
          title="유치원과 연결을 끊으시겠습니까?"
          subtitle="유치원과 연결이 끊겨 채팅내역, 알림장, 사진앨범 등의 모든 기록에 접근할 수 없어요 모든 기록은 유치원에서는 유지되니 걱정마세요"
        />
        <Modal.Button colorScheme="red" closeText="취소" actionText="탈퇴하기" actionFn={action} />
      </Modal.Content>
    </Modal>
  );
};

export default DisconnectModal;
