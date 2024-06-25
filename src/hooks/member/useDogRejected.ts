import {
  useLocalStorageValue,
  useResetLocalStorage,
  useSetLocalStorage
} from "hooks/common/useLocalStorage";
import { useCallback, useEffect, useState } from "react";
import { IEnrollmentStatus } from "types/member/enrollment.types";

import { useDeleteEnrollment, useGetEnrollmentStatus } from "../api/admin/enroll";

const STORAGE_KEY = {
  VISIT_MYPAGE: "VISIT_MYPAGE",
  ENROLLMENT_FORM_ID: "ENROLLMENT_FORM_ID",
  APPROVAL_DENIED: "APPROVAL_DENIED"
};

// 강아지 추가 승인 거부할 경우 상태 관리
export const useDogRejected = () => {
  const [approvalDeniedDogs, setApprovalDeniedDogs] = useState<IEnrollmentStatus[]>([]);
  const setStoredValue = useSetLocalStorage();
  const resetStoredEnrollmentIdValue = useResetLocalStorage(STORAGE_KEY.ENROLLMENT_FORM_ID);
  const resetStoredVisitPathIdValue = useResetLocalStorage(STORAGE_KEY.VISIT_MYPAGE);
  const { mutateDeleteEnrollment } = useDeleteEnrollment();
  const storageEnrollmentIdArr: string[] =
    useLocalStorageValue(STORAGE_KEY.ENROLLMENT_FORM_ID) || [];
  const { data: enrollmentStatusArr } = useGetEnrollmentStatus(storageEnrollmentIdArr);

  const deniedDogs = enrollmentStatusArr.filter(
    (dog) => dog.status === STORAGE_KEY.APPROVAL_DENIED
  );

  const VISIT_MYPAGE = localStorage.getItem(STORAGE_KEY.VISIT_MYPAGE);

  const saveStorageData = () => {
    setStoredValue({ key: STORAGE_KEY.VISIT_MYPAGE, value: true });
  };

  const updateEnrollmentStatus = (dataArr: string[]) => {
    if (dataArr.length <= 0) return setApprovalDeniedDogs([]);

    if (dataArr.length > 0) {
      const isDeniedDog = deniedDogs.length > 0;
      if (isDeniedDog && enrollmentStatusArr.length > 0) {
        setApprovalDeniedDogs(deniedDogs);
      }
    }
  };

  const removeApprovalDeniedDog = useCallback(async () => {
    if (approvalDeniedDogs.length <= 0) return;

    const deleteApprovalDeniedDogs = approvalDeniedDogs?.map((el) =>
      mutateDeleteEnrollment(String(el.enrollmentFormId), {
        onSuccess: () => {
          const NewEnrollmentIdArr = storageEnrollmentIdArr.filter(
            (enrollmentId, idx) =>
              Number(enrollmentId) !== approvalDeniedDogs[idx]?.enrollmentFormId
          );

          if (NewEnrollmentIdArr.length <= 0) {
            resetStoredEnrollmentIdValue();
          } else {
            setStoredValue({ key: STORAGE_KEY.ENROLLMENT_FORM_ID, value: NewEnrollmentIdArr });
          }

          setApprovalDeniedDogs([]);
          resetStoredVisitPathIdValue();
        }
      })
    );

    try {
      await Promise.all(deleteApprovalDeniedDogs);
    } catch (error) {
      return;
    }
  }, [approvalDeniedDogs, storageEnrollmentIdArr]);

  useEffect(() => {
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
