import { STORAGE_KEY } from "constants/memebrDogStatus";

import {
  useLocalStorageValue,
  useResetLocalStorage,
  useSetLocalStorage
} from "hooks/common/useLocalStorage";
import { useCallback, useEffect, useState } from "react";
import { IEnrollmentStatus } from "types/member/enrollment.types";

import { useDeleteEnrollment, useGetEnrollmentStatus } from "../api/admin/enroll";

// 강아지 추가 승인 거부할 경우 상태 관리
export const useDogRejected = () => {
  const [approvalDeniedDogs, setApprovalDeniedDogs] = useState<IEnrollmentStatus[]>([]);
  const setStoredValue = useSetLocalStorage();
  const resetStoradEnrollmentIdValue = useResetLocalStorage(STORAGE_KEY.ENROLLMENT_FORM_ID);
  const resetStoradVisitPathIdValue = useResetLocalStorage(STORAGE_KEY.VISIT_MYPAGE);
  const { mutateDeleteEnrollment } = useDeleteEnrollment();
  const VISIT_MYPAGE = useLocalStorageValue<string>(STORAGE_KEY.VISIT_MYPAGE);
  const storageEnrollmentIdArr =
    useLocalStorageValue<string[]>(STORAGE_KEY.ENROLLMENT_FORM_ID) || [];
  const { data: enrollmentStatusArr } = useGetEnrollmentStatus(storageEnrollmentIdArr);

  const deniedDogs = enrollmentStatusArr.filter(
    (dog) => dog.status === STORAGE_KEY.APPROVAL_DENIED
  );

  // localStorage에 데이터 저장
  const saveStorageData = (key: string, value: boolean | string[]) => {
    setStoredValue({ key: key, value: value });
  };

  // localStorage에 데이터 업데이트
  const updateEnrollmentStatus = (dataArr: string[]) => {
    if (dataArr.length <= 0) return setApprovalDeniedDogs([]);

    if (dataArr.length > 0) {
      const isDeniedDog = deniedDogs.length > 0;
      if (isDeniedDog && enrollmentStatusArr.length > 0) {
        setApprovalDeniedDogs(deniedDogs);
      }
    }
  };

  // ApprovalDenied 강아지 삭제 & localStorage에 데이터 업데이트
  const removeApprovalDeniedDog = useCallback(async () => {
    if (approvalDeniedDogs.length <= 0) return;

    const deleteApprovalDeniedDogs = approvalDeniedDogs?.map((el) =>
      mutateDeleteEnrollment(String(el.enrollmentFormId), {
        onSuccess: () => {
          // 삭제한 강아지를 제외한 데이터
          const NewEnrollmentIdArr = storageEnrollmentIdArr.filter(
            (enrollmentId, idx) =>
              Number(enrollmentId) !== approvalDeniedDogs[idx]?.enrollmentFormId
          );

          if (NewEnrollmentIdArr.length <= 0) {
            resetStoradEnrollmentIdValue();
          } else {
            saveStorageData(STORAGE_KEY.ENROLLMENT_FORM_ID, NewEnrollmentIdArr);
          }

          // 초기화
          setApprovalDeniedDogs([]);
          resetStoradVisitPathIdValue();
        }
      })
    );

    try {
      // 강아지 여러 마리 일 수 있어 병렬적으로 처리
      await Promise.all(deleteApprovalDeniedDogs);
    } catch (error) {
      return;
    }
  }, [approvalDeniedDogs, storageEnrollmentIdArr]);

  useEffect(() => {
    // deniedDogs에 따라 EnrollmentId 상태 저장
    if (deniedDogs.length > 0) {
      updateEnrollmentStatus(storageEnrollmentIdArr);
    }
  }, []);

  return {
    VISIT_MYPAGE,
    saveStorageData,
    STORAGE_KEY,
    approvalDeniedDogs,
    storageEnrollmentIdArr,
    removeApprovalDeniedDog,
    setApprovalDeniedDogs
  };
};

export default useDogRejected;
