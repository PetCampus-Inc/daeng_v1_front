import { STORAGE_KEY } from "constants/memberDogStatus";

import {
  useLocalStorage,
  useResetLocalStorage,
  useSetLocalStorage
} from "hooks/common/useLocalStorage";

export interface DogEnrollment {
  enrollmentFormId: string;
  dogName: string;
  registeredDate: string[];
}

/**
 * 마이페이지에서 가입신청 제출 시 localStorage에 enrollmentId 등 가입 신청 정보를 관리합니다.
 * @returns storageEnrollmentDatas createStorageEnrollment removeStorageEnrollment
 */
export const useEnrollmentStorage = () => {
  const setDogEnrollment = useSetLocalStorage(); // 생성
  const [storageEnrollmentDatas] = useLocalStorage<DogEnrollment[]>(
    STORAGE_KEY.DOG_ENROLLMENT_DATA,
    [],
    true
  ); // 데이터
  const resetStoredEnrollmentValue = useResetLocalStorage(STORAGE_KEY.DOG_ENROLLMENT_DATA);

  // localStorage에 데이터 저장
  const createStorageEnrollment = (enrollmentFormId: string, dogName: string) => {
    const enrollmentDataArr: DogEnrollment | DogEnrollment[] = [...storageEnrollmentDatas];

    if (!enrollmentDataArr.some((el) => el.enrollmentFormId === enrollmentFormId)) {
      const updateEnrollmentData = [
        ...enrollmentDataArr,
        {
          enrollmentFormId: String(enrollmentFormId),
          dogName: dogName
        }
      ];
      setDogEnrollment(STORAGE_KEY.DOG_ENROLLMENT_DATA, updateEnrollmentData);
    }
  };

  // 삭제된 데이터를 제외해 localStorage에 데이터 저장
  const removeStorageEnrollment = (enrollmentFormId: string) => {
    const removeEnrollmentData = storageEnrollmentDatas.filter(
      (el) => el.enrollmentFormId !== enrollmentFormId
    );

    if (removeEnrollmentData.length === 0) {
      resetStoredEnrollmentValue();
      return;
    }

    setDogEnrollment(STORAGE_KEY.DOG_ENROLLMENT_DATA, removeEnrollmentData);
  };

  return { storageEnrollmentDatas, createStorageEnrollment, removeStorageEnrollment };
};
