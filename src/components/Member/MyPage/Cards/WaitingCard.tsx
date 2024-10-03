import ArrowRightIcon from "assets/svg/arrow-right-icon";
import DogWaitingIcon from "assets/svg/dog-waiting-icon";
import { useDeleteMemebrEnrollment } from "hooks/api/member/enroll";
import { usePostMemberDogEnrollment } from "hooks/api/member/member";
import { formatDate } from "utils/formatter";

import * as S from "./styles";

interface IWaitingCardProps {
  dogName: string;
  registeredDate: number[];
  enrollmentFormId: number;
}

const WaitingCard = ({ dogName, registeredDate, enrollmentFormId }: IWaitingCardProps) => {
  const { mutateCancelEnrollment } = usePostMemberDogEnrollment();
  const { mutateDeleteMemebrEnrollment } = useDeleteMemebrEnrollment();

  const [year, month, day] = registeredDate && registeredDate.map(String);
  const registeredTime = formatDate(year, month, day, "dot");

  const handleCancelApproval = (enrollmentFormId: number) => {
    if (enrollmentFormId) {
      mutateCancelEnrollment(enrollmentFormId, {
        onSuccess: () => {
          mutateDeleteMemebrEnrollment(enrollmentFormId); // 승인 취소시 가입신청서 삭제
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
      <S.CancelApprovalButton onClick={() => handleCancelApproval(enrollmentFormId)}>
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
