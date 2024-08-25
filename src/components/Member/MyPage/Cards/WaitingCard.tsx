import ArrowRightIcon from "assets/svg/arrow-right-icon";
import DogWaitingIcon from "assets/svg/dog-waiting-icon";
import { useDeleteEnrollment } from "hooks/api/admin/enroll";
import { usePostMemberDogEnrollment } from "hooks/api/member/member";
import { useParams } from "react-router-dom";
import { formatDate } from "utils/formatter";

import * as S from "./styles";
import { useEnrollmentStorage } from "../hooks/useEnrollmentStorage";

interface IWaitingCardProps {
  dogName: string;
  registeredDate: number[];
}

interface DogEnrollment {
  enrollmentFormId: string;
  dogName: string;
  registeredDate: string[];
}

const WaitingCard = ({ dogName, registeredDate }: IWaitingCardProps) => {
  const { memberId } = useParams();
  const mutateMemberDogEnrollment = usePostMemberDogEnrollment(String(memberId));
  const { storageEnrollmentDatas } = useEnrollmentStorage(); // localStorage에서 가져오는 데이터
  const { mutateDeleteEnrollment } = useDeleteEnrollment();

  const [year, month, day] = registeredDate && registeredDate;
  const registeredTime = formatDate(String(year), String(month), String(day), "dot");

  const handleCancelApproval = (dogName: string) => {
    const cancelDog = storageEnrollmentDatas.find((el) => el.dogName === dogName);
    if (cancelDog) {
      const enrollmentFormId = cancelDog.enrollmentFormId;
      mutateMemberDogEnrollment(String(enrollmentFormId), {
        onSuccess() {
          // 승인 취소시 가입신청서 폼 아예 삭제
          mutateDeleteEnrollment(String(enrollmentFormId));
        }
      });
    }
  };

  return (
    <S.WaitingCard>
      <S.InfoTextBox mb="32">
        <S.DogName>{dogName}</S.DogName>
        <S.CurrentStatusBox>승인 대기중</S.CurrentStatusBox>
      </S.InfoTextBox>
      <S.CancelApprovalButton onClick={() => handleCancelApproval(dogName)}>
        <S.DateText>{registeredTime} 제출 | 승인 취소</S.DateText>
        <ArrowRightIcon w={19} />
      </S.CancelApprovalButton>
      <S.BgIconBox>
        <DogWaitingIcon />
      </S.BgIconBox>
    </S.WaitingCard>
  );
};

export default WaitingCard;
