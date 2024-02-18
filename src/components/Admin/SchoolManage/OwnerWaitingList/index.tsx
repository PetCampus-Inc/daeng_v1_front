import * as S from "./styles";
import TitleWithIcon from "../TitleWithIcon";
import OwnerWaitingCard from "../OwnerWaitingCard";
import useGetWatingOwnersList from "hooks/api/useGetWaitingOwnersList";

const OwnerWaitingList = () => {
  const { data } = useGetWatingOwnersList(1);

  if (!data || data.length === 0) {
    return (
      <S.OwnerWaitingListContainer>
        <TitleWithIcon title="승인 대기중인 견주들" />
        <S.Text>승인 대기중인 견주가 없어요</S.Text>
      </S.OwnerWaitingListContainer>
    );
  }

  return (
    <S.OwnerWaitingListContainer>
      <TitleWithIcon title="승인 대기중인 견주들" />
      <S.ListContainer>
        {data?.map((owner) => <OwnerWaitingCard key={owner.enrollmentFormId} data={owner} />)}
      </S.ListContainer>
    </S.OwnerWaitingListContainer>
  );
};

export default OwnerWaitingList;
