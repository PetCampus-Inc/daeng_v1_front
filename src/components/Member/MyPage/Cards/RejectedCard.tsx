import DogRejectedIcon from "assets/svg/dog-rejected-icon";
import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";

const RejectedCard = () => {
  return (
    <S.RejectedCard>
      <S.InfoTextBox>
        <S.DogName textColor={ThemeConfig.colors.gray_1}>뽀뽀</S.DogName>
        <S.StatusBox bgColor={ThemeConfig.colors.red_1}>승인 거절</S.StatusBox>
        <S.CurrentStatusText textColor={ThemeConfig.colors.gray_1}>
          2023.12.20 제출
        </S.CurrentStatusText>
      </S.InfoTextBox>
      <S.BgIconBox>
        <DogRejectedIcon />
      </S.BgIconBox>
    </S.RejectedCard>
  );
};

export default RejectedCard;
