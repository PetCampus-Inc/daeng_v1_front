import * as S from "./styles";
import TitleWithIcon from "../TitleWithIcon";
import OwnerWaitingCard from "../OwnerWaitingCard";

const OwnerWaitingList = () => {
  return (
    <S.OwnerWaitingListContainer>
      <TitleWithIcon title="승인 대기중인 견주들" />
      <OwnerWaitingCard />
      {/* <S.Text>승인 대기중인 견주가 없어요</S.Text> */}
    </S.OwnerWaitingListContainer>
  );
};

export default OwnerWaitingList;
