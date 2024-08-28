import { STORAGE_KEY } from "constants/memebrDogStatus";

import {
  DogEnrollment,
  useEnrollmentStorage
} from "components/Member/MyPage/hooks/useEnrollmentStorage";
import {
  useLocalStorageValue,
  useResetLocalStorage,
  useSetLocalStorage
} from "hooks/common/useLocalStorage";
import { useCallback, useEffect, useState } from "react";

import { useDeleteEnrollment, useGetEnrollmentStatus } from "../../../../hooks/api/admin/enroll";

/**
 * 강아지 추가 승인 거부할 경우 상태 관리를 관리합니다.
 * @returns
 */

export const useDogRejected = () => {
  const [dogs, setDogs] = useState<DogEnrollment[] | null>([]);
  const [initialVisit, setInitialVisit] = useState(false);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const setStoredValue = useSetLocalStorage();
  const resetStoradVisitPathIdValue = useResetLocalStorage(STORAGE_KEY.VISIT_MYPAGE);
  const resetStoradEnrollmentValue = useResetLocalStorage(STORAGE_KEY.DOG_ENROLLMENT_DATA);

  const { mutateDeleteEnrollment } = useDeleteEnrollment();

  const VISIT_MYPAGE = useLocalStorageValue<string>(STORAGE_KEY.VISIT_MYPAGE);

  const { storageEnrollmentDatas } = useEnrollmentStorage(); // localStorage에서 가져오는 데이터

  const { data: approvalDeniedDogs } = useGetEnrollmentStatus(
    dogs?.map((el) => el.enrollmentFormId) || []
  );

  // localStorage에 데이터 저장
  const saveStorageData = useCallback(
    (key: string, value: boolean | DogEnrollment[]) => {
      setStoredValue({ key: key, value: value });
    },
    [setStoredValue]
  );

  // dog 데이터 업데이트
  const updateDogs = useCallback(
    (newDogs: DogEnrollment[]) => {
      if (newDogs.length <= 0) {
        // newDogs 데이터가 없을 경우 초기화
        resetStoradEnrollmentValue();
        setDogs([]);
      } else {
        saveStorageData(STORAGE_KEY.DOG_ENROLLMENT_DATA, newDogs);
        setDogs(newDogs);
      }
    },
    [resetStoradEnrollmentValue, saveStorageData]
  );

  // ApprovalDenied 강아지 삭제 & localStorage에 데이터 업데이트
  const removeApprovalDeniedDog = useCallback(async () => {
    if (
      (storageEnrollmentDatas.length === 0 || approvalDeniedDogs.length === 0) &&
      isDeleteSuccessful
    ) {
      return;
    }

    const deleteApprovalDeniedDogs = approvalDeniedDogs?.map((el) =>
      mutateDeleteEnrollment(String(el.enrollmentFormId))
    );

    try {
      await Promise.all(deleteApprovalDeniedDogs);

      // 삭제할 강아지를 제외한 데이터
      const updateEnrollmentDatas =
        storageEnrollmentDatas.filter(
          (localDog) =>
            !approvalDeniedDogs.some(
              (dog) => dog.enrollmentFormId === Number(localDog.enrollmentFormId)
            )
        ) || [];

      saveStorageData(STORAGE_KEY.DOG_ENROLLMENT_DATA, [...updateEnrollmentDatas]);
      updateDogs(updateEnrollmentDatas); // data update
      resetStoradVisitPathIdValue(); // mypage path 초기화
      setIsDeleteSuccessful(true); // isDeleteSuccessful 초기화
    } catch (error) {
      console.error(error);
      return;
    }
  }, [
    isDeleteSuccessful,
    approvalDeniedDogs,
    storageEnrollmentDatas,
    mutateDeleteEnrollment,
    resetStoradVisitPathIdValue,
    updateDogs
  ]);

  useEffect(() => {
    if (storageEnrollmentDatas?.length > 0) {
      setDogs(storageEnrollmentDatas);
    }
  }, [storageEnrollmentDatas]);

  return {
    VISIT_MYPAGE,
    saveStorageData,
    resetStoradVisitPathIdValue,
    removeApprovalDeniedDog,
    initialVisit,
    isDeleteSuccessful,
    setInitialVisit
  };
};

export default useDogRejected;
