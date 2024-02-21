import * as S from "./styles";
import TitleWithIcon from "../TitleWithIcon";
import OwnerWaitingCard from "../OwnerWaitingCard";
import useGetWatingOwnersList from "hooks/api/useGetWaitingOwnersList";
import { LayoutGroup } from "framer-motion";

const OwnerWaitingList = () => {
  const { data } = useGetWatingOwnersList(2);

  return (
    <S.OwnerWaitingListContainer>
      <TitleWithIcon title="승인 대기중인 견주들" />
      {data && data.length > 0 ? (
        <S.ListContainer>
          <LayoutGroup>
            {data.map((owner) => (
              <OwnerWaitingCard key={owner.enrollmentFormId} data={owner} />
            ))}
          </LayoutGroup>
        </S.ListContainer>
      ) : (
        <S.Text>승인 대기중인 견주가 없어요</S.Text>
      )}
    </S.OwnerWaitingListContainer>
  );
};

export default OwnerWaitingList;
