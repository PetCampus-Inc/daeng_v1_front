import { STORAGE_KEY } from "constants/memebrDogStatus";

import { useLocalStorageValue, useSetLocalStorage } from "hooks/common/useLocalStorage";

export interface DogEnrollment {
  enrollmentFormId: string;
  dogName: string;
  registeredDate: string[];
}

/**
 * 마이페이지에서 가입신청 제출 시 localStorage에 enrollmentId 등 가입 신청 정보를 관리합니다.
 * @returns storageEnrollmentDatas createStorageEnrollment
 */
export const useEnrollmentStorage = () => {
  const setDogEnrollment = useSetLocalStorage(); // 생성
  const storageEnrollmentDatas: DogEnrollment[] =
    useLocalStorageValue(STORAGE_KEY.DOG_ENROLLMENT_DATA) || []; // 데이터

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return [year, month, day];
  };

  // localStorage에 데이터 저장
  const createStorageEnrollment = (enrollmentFormId: string, dogName: string) => {
    const enrollmentDataArr: DogEnrollment | DogEnrollment[] = [...storageEnrollmentDatas];

    if (!enrollmentDataArr.some((el) => el.enrollmentFormId === enrollmentFormId)) {
      const updateEnrollmentData = [
        ...enrollmentDataArr,
        {
          enrollmentFormId: String(enrollmentFormId),
          dogName: dogName,
          registeredDate: getTodayDate()
        }
      ];
      setDogEnrollment({
        key: STORAGE_KEY.DOG_ENROLLMENT_DATA,
        value: updateEnrollmentData
      });
    }
  };

  // 삭제된 데이터를 제외해 localStorage에 데이터 저장
  const removeStorageEnrollment = (enrollmentFormId: string) => {
    const removeEnrollmentData = storageEnrollmentDatas.filter(
      (el) => el.enrollmentFormId !== enrollmentFormId
    );
    setDogEnrollment({
      key: STORAGE_KEY.DOG_ENROLLMENT_DATA,
      value: removeEnrollmentData
    });
  };

  return { storageEnrollmentDatas, createStorageEnrollment, removeStorageEnrollment };
};
