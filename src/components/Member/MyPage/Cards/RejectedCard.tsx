import { STORAGE_KEY } from "constants/memberDogStatus";

import DogRejectedIcon from "assets/svg/dog-rejected-icon";
import { useDeleteMemebrEnrollment } from "hooks/api/member/enroll";
import { useResetLocalStorage, useSetLocalStorage } from "hooks/common/useLocalStorage";
import { useEffect, useState } from "react";
import { themeConfig } from "styles/themeConfig";
import { IDogRejected } from "types/member/main.types";
import { formatDate } from "utils/formatter";

import * as S from "./styles";

const RejectedCard = ({ dogName, registeredDate, enrollmentFormId }: IDogRejected) => {
  const [isVisitMyPage, setIsVisitMyPage] = useState(
    localStorage.getItem(STORAGE_KEY.VISIT_MYPAGE) === "true"
  );
  const { mutateDeleteMemebrEnrollment } = useDeleteMemebrEnrollment();
  const setStoredValue = useSetLocalStorage();
  const resetStoredVisitPathIdValue = useResetLocalStorage(STORAGE_KEY.VISIT_MYPAGE);

  const [year, month, day] = registeredDate ? registeredDate : [];
  const registeredTime = formatDate(String(year), String(month), String(day), "dot");

  // DeniedDog 가입신청서 삭제
  const removeApprovalDeniedDog = async () => {
    if (enrollmentFormId) {
      mutateDeleteMemebrEnrollment(enrollmentFormId, {
        onSuccess: () => {
          resetStoredVisitPathIdValue(); // VISIT_MYPAGE localStorage에 삭제
        }
      });
    }
  };

  useEffect(() => {
    // 승인 거절 강아지가 있는 경우
    setStoredValue(STORAGE_KEY.VISIT_MYPAGE, true);
  }, []);

  useEffect(() => {
    // VISIT_MYPAGE인 경우
    if (isVisitMyPage) {
      removeApprovalDeniedDog();
    }
  }, [isVisitMyPage]);

  return (
    <S.RejectedCard>
      <S.InfoTextBox>
        <S.DogName textcolor={themeConfig.colors.gray_1}>{dogName}</S.DogName>
        <S.CurrentStatusBox bgcolor={themeConfig.colors.red_1}>승인 거절</S.CurrentStatusBox>
        <S.DateText textcolor={themeConfig.colors.gray_1}>{registeredTime} 제출</S.DateText>
      </S.InfoTextBox>
      <S.BgIconBox>
        <DogRejectedIcon />
      </S.BgIconBox>
    </S.RejectedCard>
  );
};

export default RejectedCard;
