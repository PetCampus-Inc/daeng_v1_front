import AllergyChartIcon from "assets/svg/allergy-chart-icon";
import CarIcon from "assets/svg/car-icon";
import { Flex } from "components/common/Flex";
import { useDogDisconnected } from "hooks/common/dog/useDogDisconnected";

import * as S from "../../styles";

interface DogMemoProps {
  type: string;
  memo: string;
  title: string;
  openPopup: (title: string, memo: string, type: string) => void;
}

const DogMemoBox = ({ type, memo, title, openPopup }: DogMemoProps) => {
  // 유치원 끊긴 강아지 여부 및 UI 표시
  const { isDisconnected } = useDogDisconnected();
  const memoData = memo ? memo : "";

  return (
    <S.DogMoreInfoCard>
      <S.TopInfoBox>
        <Flex gap="4" align="center">
          <S.Icon size="24px">
            {type === "pickDrop" && <CarIcon />}
            {type === "allergy" && <AllergyChartIcon />}
          </S.Icon>
          <S.DogMoreInfo>{title}</S.DogMoreInfo>
        </Flex>
        {!isDisconnected && (
          <S.DogMoreInfoEditButton onClick={() => openPopup(title, memoData, type)}>
            수정
          </S.DogMoreInfoEditButton>
        )}
      </S.TopInfoBox>
      <S.DogMoreInfoText>{memoData}</S.DogMoreInfoText>
    </S.DogMoreInfoCard>
  );
};

export default DogMemoBox;
