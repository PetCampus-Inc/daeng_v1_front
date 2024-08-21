import DogRejectedIcon from "assets/svg/dog-rejected-icon";
import { themeConfig } from "styles/themeConfig";

import * as S from "./styles";
interface IRejectedCardProps {
  dogName: string;
  registeredDate?: number[] | null;
}

const RejectedCard = ({ dogName, registeredDate }: IRejectedCardProps) => {
  return (
    <S.RejectedCard>
      <S.InfoTextBox>
        <S.DogName textColor={themeConfig.colors.gray_1}>{dogName}</S.DogName>
        <S.CurrentStatusBox bgColor={themeConfig.colors.red_1}>승인 거절</S.CurrentStatusBox>
        <S.DateText textColor={themeConfig.colors.gray_1}>{registeredDate} 제출</S.DateText>
      </S.InfoTextBox>
      <S.BgIconBox>
        <DogRejectedIcon />
      </S.BgIconBox>
    </S.RejectedCard>
  );
};

export default RejectedCard;
