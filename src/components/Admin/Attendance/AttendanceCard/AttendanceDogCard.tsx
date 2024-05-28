import FootIcon from "assets/svg/foot-icon";

import * as S from "./styles";

interface AttendanceCardProps {
  attendanceId: number;
  dogName: string;
  onClick: () => void;
  isSelected: boolean;
}

const AttendanceDogCard = ({ dogName, onClick, isSelected }: AttendanceCardProps) => {
  return (
    <S.CardContainer $isAvatar onClick={onClick}>
      <S.Stack>
        <S.ImageWrapper>
          <S.Image
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={dogName + " 이미지"}
          />
        </S.ImageWrapper>
        <S.StyledText>{dogName}</S.StyledText>
      </S.Stack>
      <S.FootButton type="button" className={isSelected ? "" : "active"}>
        <FootIcon />
      </S.FootButton>
    </S.CardContainer>
  );
};

export default AttendanceDogCard;
