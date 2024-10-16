import { useLocalStorage, useSetLocalStorage } from "../useLocalStorage";

/**
 * 유치원 연결이 끊긴 강아지 여부를 확인 합니다.
 * @returns setStorageDisconnected, isDisconnected
 */
export const useDogDisconnected = () => {
  const DOG_DIS_CONNECTIED = "DOG-DIS-CONNECTIED";

  const setStorage = useSetLocalStorage();
  const [isDisconnected] = useLocalStorage(DOG_DIS_CONNECTIED, false);

  // disconnected localStorage에 저장
  const setStorageDisconnected = (dogStatus: boolean) => {
    setStorage(DOG_DIS_CONNECTIED, dogStatus);
  };

  return { setStorageDisconnected, isDisconnected };
};
