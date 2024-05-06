import ArrowRightIcon from "assets/svg/arrow-right-icon";
import DogWaitingIcon from "assets/svg/dog-waiting-icon";

import * as S from "./styles";

const WaitingCard = () => {
  return (
    <S.WaitingCard>
      <S.InfoTextBox mb="32">
        <S.DogName>뽀뽀</S.DogName>
        <S.CurrentStatusBox>승인 대기중</S.CurrentStatusBox>
      </S.InfoTextBox>
      <S.CancelApprovalButton>
        <S.DateText>2023.12.20 제출 | 승인 취소</S.DateText>
        <ArrowRightIcon />
      </S.CancelApprovalButton>
      <S.BgIconBox>
        <DogWaitingIcon />
      </S.BgIconBox>
    </S.WaitingCard>
  );
};

export default WaitingCard;
