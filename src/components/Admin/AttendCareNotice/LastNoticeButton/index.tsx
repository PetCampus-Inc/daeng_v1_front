import PastNoticeIcon from "assets/svg/past-notice-icon";
import { useGetPastAgenda } from "hooks/api/admin/care";
import { useOverlay } from "hooks/common/useOverlay";
import { useLocation } from "react-router-dom";
import showToast from "utils/showToast";

import * as S from "./styles";
import PastAgendaBottomSheet from "../PastAgendaBottomSheet";

const LastNoticeButton = () => {
  const dogId = useLocation().pathname.split("/").pop();
  const { data } = useGetPastAgenda(Number(dogId));
  const overlay = useOverlay();

  const openCallPopup = () => {
    if (data && data.length > 0) {
      overlay.open(({ isOpen, close }) => (
        <PastAgendaBottomSheet data={data} isOpen={isOpen} close={close} />
      ));
    } else {
      showToast("지난 알림장이 없습니다.", "bottom");
    }
  };

  return (
    <S.ButtonContainer onClick={openCallPopup}>
      <PastNoticeIcon />
      지난 알림장 보기
    </S.ButtonContainer>
  );
};

export default LastNoticeButton;
