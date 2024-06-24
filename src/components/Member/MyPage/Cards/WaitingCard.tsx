import { DOG_STATUS } from "constants/memebrDogStatus";

import ArrowRightIcon from "assets/svg/arrow-right-icon";
import DogWaitingIcon from "assets/svg/dog-waiting-icon";
import { useGetMemberInfo, usePostMemberDogEnrollment } from "hooks/api/member/member";
import { useGetSchoolInfoList } from "hooks/api/member/school";
import useGetWaitingOwnersList from "hooks/api/useGetWaitingOwnersList";
import { useParams } from "react-router-dom";
import { formatDate } from "utils/formatter";

import * as S from "./styles";

interface IWaitingCardProps {
  dogName: string;
  registeredDate: number[];
}

const WaitingCard = ({ dogName, registeredDate }: IWaitingCardProps) => {
  const { memberId } = useParams();
  const { data: memberInfo } = useGetMemberInfo(String(memberId));
  const mutateMemberDogEnrollment = usePostMemberDogEnrollment(String(memberId));

  const approvalPendingDog = memberInfo.doglist.filter(
    (dog) => dog.status && dog.status === DOG_STATUS.APPROVAL_PENDING
  );
  const { data: getSchoolInfoList } = useGetSchoolInfoList(
    String(approvalPendingDog[0].schoolName)
  );
  const { data: waitingOwnersList } = useGetWaitingOwnersList(
    Number(getSchoolInfoList[0].schoolId)
  );

  const [year, month, day] = registeredDate && registeredDate;
  const registeredTime = formatDate(String(year), String(month), String(day), "dot");

  const handleCancelApproval = () => {
    const approvalPendingDogName = approvalPendingDog?.map((dog) => dog.dogName)[0];
    const memberName = memberInfo.memberName;
    const enrollmentForm = waitingOwnersList?.find(
      (item) => item.memberName === memberName && item.dogName === approvalPendingDogName
    );
    if (enrollmentForm) {
      mutateMemberDogEnrollment(String(enrollmentForm.enrollmentFormId));
    }
  };

  return (
    <>
      <S.WaitingCard>
        <S.InfoTextBox mb="32">
          <S.DogName>{dogName}</S.DogName>
          <S.CurrentStatusBox>승인 대기중</S.CurrentStatusBox>
        </S.InfoTextBox>
        <S.CancelApprovalButton onClick={handleCancelApproval}>
          <S.DateText>{registeredTime} 제출 | 승인 취소</S.DateText>
          <ArrowRightIcon />
        </S.CancelApprovalButton>
        <S.BgIconBox>
          <DogWaitingIcon />
        </S.BgIconBox>
      </S.WaitingCard>
    </>
  );
};

export default WaitingCard;
