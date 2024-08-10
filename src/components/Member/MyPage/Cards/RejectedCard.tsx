import DogRejectedIcon from "assets/svg/dog-rejected-icon";
import { themeConfig } from "styles/themeConfig";
import { IDogRejected } from "types/member/main.types";
import { formatDate } from "utils/formatter";

import * as S from "./styles";

const RejectedCard = ({ dogName, registeredDate }: IDogRejected) => {
  const [year, month, day] = registeredDate ? registeredDate : [];
  const registeredTime = formatDate(String(year), String(month), String(day), "dot");

  return (
    <S.RejectedCard>
      <S.InfoTextBox>
        <S.DogName textColor={themeConfig.colors.gray_1}>{dogName}</S.DogName>
        <S.CurrentStatusBox bgColor={themeConfig.colors.red_1}>승인 거절</S.CurrentStatusBox>
        <S.DateText textColor={themeConfig.colors.gray_1}>{registeredTime} 제출</S.DateText>
      </S.InfoTextBox>
      <S.BgIconBox>
        <DogRejectedIcon />
      </S.BgIconBox>
    </S.RejectedCard>
  );
};

export default RejectedCard;
