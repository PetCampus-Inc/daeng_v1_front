import FootIcon from "assets/svg/foot-icon";

import * as S from "./styles";

interface AttendanceCardProps {
  attendanceId: number;
  dogProfileUri: string;
  dogName: string;
  onClick: () => void;
  isSelected: boolean;
}

export function AttendDogCard({
  dogProfileUri,
  dogName,
  onClick,
  isSelected
}: AttendanceCardProps) {
  return (
    <S.CardContainer hasAvatar onClick={onClick}>
      <S.Stack>
        <S.ImageWrapper>
          <S.Image src={dogProfileUri} alt={dogName + " 이미지"} />
        </S.ImageWrapper>
        <S.DogName typo="body2_16_B">{dogName}</S.DogName>
      </S.Stack>
      <S.FootButton type="button" className={isSelected ? "" : "active"}>
        <FootIcon />
      </S.FootButton>
    </S.CardContainer>
  );
}
