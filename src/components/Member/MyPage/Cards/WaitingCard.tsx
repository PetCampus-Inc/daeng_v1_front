import ArrowRightIcon from "assets/svg/arrow-right-icon";
import DogWaitingIcon from "assets/svg/dog-waiting-icon";
import { useGetMemberInfo } from "hooks/api/member/member";
import { useParams } from "react-router-dom";

import * as S from "./styles";

interface IWaitingCardProps {
  dogName: string;
  registeredDate?: number[] | null;
}

const WaitingCard = ({ dogName, registeredDate }: IWaitingCardProps) => {
  const { memberId } = useParams();
  const { data: memberInfo } = useGetMemberInfo(String(memberId));
  const approvalPendingDog = memberInfo.doglist.filter(
    (dog) => dog.status && dog.status === "APPROVAL_PENDING"
  );
  const approvalPendingSchoolName = approvalPendingDog?.map((dog) => dog.schoolName)[0];

  const handleCancelApproval = () => {
    console.log("승인취소");
    console.log("approvalPendingSchoolName", approvalPendingSchoolName);
  };
  return (
    <S.WaitingCard>
      <S.InfoTextBox mb="32">
        <S.DogName>{dogName}</S.DogName>
        <S.CurrentStatusBox>승인 대기중</S.CurrentStatusBox>
      </S.InfoTextBox>
      <S.CancelApprovalButton onClick={handleCancelApproval}>
        <S.DateText>{registeredDate && registeredDate} 제출 | 승인 취소</S.DateText>
        <ArrowRightIcon />
      </S.CancelApprovalButton>
      <S.BgIconBox>
        <DogWaitingIcon />
      </S.BgIconBox>
    </S.WaitingCard>
  );
};

export default WaitingCard;
