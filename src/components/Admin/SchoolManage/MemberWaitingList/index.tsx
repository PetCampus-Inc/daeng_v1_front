import { LayoutGroup } from "framer-motion";
import useGetWaitingOwnersList from "hooks/api/useGetWaitingOwnersList";
import { useAdminInfo } from "hooks/common/useAdminInfo";

import * as S from "./styles";
import OwnerWaitingCard from "../MemberWaitingCard";
import TitleWithIcon from "../TitleWithIcon";

const MemberWaitingList = () => {
  const { schoolId } = useAdminInfo();
  const { data } = useGetWaitingOwnersList(schoolId);

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

export default MemberWaitingList;
