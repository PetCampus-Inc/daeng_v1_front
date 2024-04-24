import PastNoticeIcon from "assets/svg/past-notice-icon";

import * as S from "./styles";
const LastNoticeButton = () => {
  return (
    <S.ButtonContainer>
      <PastNoticeIcon />
      지난 알림장 보기
    </S.ButtonContainer>
  );
};

export default LastNoticeButton;
