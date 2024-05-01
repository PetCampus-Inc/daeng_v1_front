import PastNoticeIcon from "assets/svg/past-notice-icon";
import useOverlay from "hooks/common/useOverlay/useOverlay";

import * as S from "./styles";
import PastAgendaBottomSheet from "../PastAgendaBottomSheet";

const LastNoticeButton = () => {
  const overlay = useOverlay();

  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => <PastAgendaBottomSheet isOpen={isOpen} close={close} />);

  return (
    <S.ButtonContainer onClick={openCallPopup}>
      <PastNoticeIcon />
      지난 알림장 보기
    </S.ButtonContainer>
  );
};

export default LastNoticeButton;
