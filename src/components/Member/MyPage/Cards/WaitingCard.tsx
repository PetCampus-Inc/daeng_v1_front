import ArrowRightIcon from "assets/svg/arrow-right-icon";
import DogWaitingIcon from "assets/svg/dog-waiting-icon";
import { useDeleteEnrollment } from "hooks/api/admin/enroll";
import { usePostMemberDogEnrollment } from "hooks/api/member/member";
import { formatDate } from "utils/formatter";

import * as S from "./styles";
import { useEnrollmentStorage } from "../hooks/useEnrollmentStorage";

interface IWaitingCardProps {
  dogName: string;
  registeredDate: number[];
}

const WaitingCard = ({ dogName, registeredDate }: IWaitingCardProps) => {
  const { mutateCancelEnrollment } = usePostMemberDogEnrollment();
  const { storageEnrollmentDatas, removeStorageEnrollment } = useEnrollmentStorage(); // localStorage에서 가져오는 데이터
  const { mutateDeleteEnrollment } = useDeleteEnrollment();

  const [year, month, day] = registeredDate && registeredDate.map(String);
  const registeredTime = formatDate(year, month, day, "dot");

  const handleCancelApproval = async (dogName: string) => {
    // FIXME 강아지 이름이 동일할 경우 어떻게 거를지 확인 필요
    const cancelDog = storageEnrollmentDatas.find((el) => el.dogName === dogName);

    if (!cancelDog) return;

    if (cancelDog) {
      try {
        mutateCancelEnrollment(cancelDog.enrollmentFormId, {
          onSuccess: () => {
            mutateDeleteEnrollment(cancelDog.enrollmentFormId); // 승인 취소시 가입신청서 삭제
            removeStorageEnrollment(cancelDog.enrollmentFormId); // localStorage에서도 삭제
          }
        });
      } catch (error) {
        console.error(error);
      }
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
