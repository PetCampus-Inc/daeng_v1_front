import { LayoutGroup } from "framer-motion";
import useGetWaitingOwnersList from "hooks/api/useGetWaitingOwnersList";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import * as S from "./styles";
import OwnerWaitingCard from "../MemberWaitingCard";
import TitleWithIcon from "../TitleWithIcon";

const MemberWaitingList = () => {
  // FIXME: school ID 관리 필요!!!
  const { schoolId } = useRecoilValue(adminLoginInfoAtom);
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
