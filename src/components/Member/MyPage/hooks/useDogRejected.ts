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

// FIXME 삭제가 성공했음에도 불구하고 한 번 더 호출 되는 이슈

/**
 * 강아지 추가 승인 거부할 경우 상태 관리를 관리합니다.
 * @returns
 */

// 강아지 추가 승인 거부할 경우 상태 관리
export const useDogRejected = () => {
  const [dogs, setDogs] = useState<DogEnrollment[] | null>([]);
  const [initialVisit, setInitialVisit] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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
      storageEnrollmentDatas.length <= 0 ||
      !approvalDeniedDogs ||
      approvalDeniedDogs.length <= 0 ||
      isDeleteSuccessful
    ) {
      return;
    }

    const deleteApprovalDeniedDogs = approvalDeniedDogs?.map((el) =>
      mutateDeleteEnrollment(String(el.enrollmentFormId))
    );

    try {
      // 삭제된 강아지 여러 마리 일 수 있어 병렬적으로 처리
      await Promise.all(deleteApprovalDeniedDogs);
      // 삭제한 강아지를 제외한 데이터
      const updateEnrollmentDatas =
        storageEnrollmentDatas.filter(
          (localDog) =>
            !approvalDeniedDogs.some(
              (dog) => dog.enrollmentFormId === Number(localDog.enrollmentFormId)
            )
        ) || [];

      updateDogs(updateEnrollmentDatas); // data update
      resetStoradVisitPathIdValue(); // mypage path 초기화
      setIsDeleteSuccessful(true);
      console.log("에러 그만 생겨라 그리고 중복 호출 멈춰!");
    } catch (error) {
      console.error(error);
    }
  }, [
    isDeleteSuccessful,
    approvalDeniedDogs,
    mutateDeleteEnrollment,
    resetStoradVisitPathIdValue,
    updateDogs
  ]);

  useEffect(() => {
    if (!isDataLoaded && storageEnrollmentDatas?.length > 0) {
      setDogs(storageEnrollmentDatas);
      setIsDataLoaded(true); // useEffect 무한 로딩 방지 되도록
    }
  }, [isDataLoaded, storageEnrollmentDatas]);

  return {
    VISIT_MYPAGE,
    saveStorageData,
    STORAGE_KEY,
    approvalDeniedDogs,
    resetStoradVisitPathIdValue,
    removeApprovalDeniedDog,
    initialVisit,
    setInitialVisit
  };
};

export default useDogRejected;
