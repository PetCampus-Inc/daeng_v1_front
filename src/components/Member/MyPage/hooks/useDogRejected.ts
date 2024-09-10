import { STORAGE_KEY } from "constants/memberDogStatus";

import {
  DogEnrollment,
  useEnrollmentStorage
} from "components/Member/MyPage/hooks/useEnrollmentStorage";
import {
  useLocalStorage,
  useResetLocalStorage,
  useSetLocalStorage
} from "hooks/common/useLocalStorage";
import { useCallback, useEffect, useState } from "react";

import { useDeleteEnrollment, useGetEnrollmentStatus } from "../../../../hooks/api/admin/enroll";

/**
 * 강아지 추가 승인 거부할 경우 상태 관리를 관리합니다.
 * @returns VISIT_MYPAGE, initialVisit, isDeleteSuccessful, setInitialVisit, saveStorageData, resetStoredVisitPathIdValue, removeApprovalDeniedDog
 */

export const useDogRejected = () => {
  const [dogDatas, setDogDatas] = useState<DogEnrollment[] | null>([]);
  const [initialVisit, setInitialVisit] = useState(false);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const setStoredValue = useSetLocalStorage();
  const resetStoredVisitPathIdValue = useResetLocalStorage(STORAGE_KEY.VISIT_MYPAGE);
  const resetStoredEnrollmentValue = useResetLocalStorage(STORAGE_KEY.DOG_ENROLLMENT_DATA);

  const { mutateDeleteEnrollment } = useDeleteEnrollment();

  const [VISIT_MYPAGE] = useLocalStorage(STORAGE_KEY.VISIT_MYPAGE, false);

  const { storageEnrollmentDatas } = useEnrollmentStorage(); // localStorage에서 가져오는 데이터

  const { data: approvalDeniedDogs } = useGetEnrollmentStatus(
    dogDatas?.map((el) => el.enrollmentFormId) || []
  );

  // localStorage 데이터 저장
  const saveStorageData = useCallback(
    (key: string, value: boolean | DogEnrollment[]) => {
      setStoredValue(key, value);
    },
    [setStoredValue]
  );

  // localStorage 데이터 업데이트
  const updateStorageData = useCallback(
    (newDogs: DogEnrollment[]) => {
      if (newDogs.length <= 0) {
        // newDogs 데이터가 없을 경우 초기화
        resetStoredEnrollmentValue();
        setDogDatas([]);
      } else {
        saveStorageData(STORAGE_KEY.DOG_ENROLLMENT_DATA, newDogs);
        setDogDatas(newDogs);
      }
    },
    [resetStoredEnrollmentValue, saveStorageData]
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
      // 승인 거부한 강아지가 여러 마리일 경우 대비
      await Promise.all(deleteApprovalDeniedDogs);

      // 삭제할 강아지를 제외한 데이터
      const updateEnrollmentDatas = storageEnrollmentDatas.filter(
        (localDog) =>
          !approvalDeniedDogs.some(
            (dog) => dog.enrollmentFormId === Number(localDog.enrollmentFormId)
          )
      );

      updateStorageData(updateEnrollmentDatas); // data update
      resetStoredVisitPathIdValue(); // mypage path reset
      setIsDeleteSuccessful(true); // isDeleteSuccessful reset
    } catch (error) {
      console.error(error);
      return;
    }
  }, [
    isDeleteSuccessful,
    approvalDeniedDogs,
    storageEnrollmentDatas,
    mutateDeleteEnrollment,
    resetStoredVisitPathIdValue,
    updateStorageData
  ]);

  // storageEnrollmentDatas에 따라 DogDatas에 데이터 전달
  useEffect(() => {
    if (storageEnrollmentDatas?.length > 0) {
      setDogDatas(storageEnrollmentDatas);
    }
  }, [storageEnrollmentDatas]);

  return {
    VISIT_MYPAGE,
    initialVisit,
    isDeleteSuccessful,
    setInitialVisit,
    saveStorageData,
    resetStoredVisitPathIdValue,
    removeApprovalDeniedDog
  };
};

export default useDogRejected;
