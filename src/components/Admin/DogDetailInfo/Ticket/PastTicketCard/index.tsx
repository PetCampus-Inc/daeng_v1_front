import PastTicket from "../\bPastTicket";
import * as S from "./styles";

const PastTicketCard = () => {
  return (
    <S.Container>
      <S.List>
        <S.ListInnerBox className="left">이용권 유형</S.ListInnerBox>
        <S.ListInnerBox>이용기간</S.ListInnerBox>
      </S.List>
      <PastTicket />
    </S.Container>
  );
};

export default PastTicketCard;
