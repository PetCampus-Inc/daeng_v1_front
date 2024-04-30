import DogRejectedIcon from "assets/svg/dog-rejected-icon";

import * as S from "./styles";

const RejectedCard = () => {
  return (
    <S.RejectedCard>
      <S.BgIconBox className="iconPosition">
        <DogRejectedIcon />
      </S.BgIconBox>
      <S.InfoTextBox>
        <S.DogName>뽀뽀</S.DogName>
        <S.StatusBox>승인 거절</S.StatusBox>
        <S.CurrentStatusText>2023.12.20 제출</S.CurrentStatusText>
      </S.InfoTextBox>
    </S.RejectedCard>
  );
};

export default RejectedCard;
