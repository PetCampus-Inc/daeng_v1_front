import DisconnectionNotice from "components/Home/DisconnectionNotice/DisconnectionNotice";

import { useLocalStorage, useSetLocalStorage } from "../useLocalStorage";

/**
 * 유치원 연결이 끊긴 강아지 여부 및 끊긴 상태인 경우 해당 UI를 표시합니다.
 * @returns setStorageDisconnected, disconnectedItem, isDisconnected
 */
export const useDogDisconnected = () => {
  const DOG_DIS_CONNECTIED = "DOG-DIS-CONNECTIED";

  const setStorage = useSetLocalStorage();
  const [isDisconnected] = useLocalStorage(DOG_DIS_CONNECTIED, false);

  // disconnected localStorage에 저장
  const setStorageDisconnected = (data: boolean) => {
    setStorage(DOG_DIS_CONNECTIED, data);
  };

  // disconnected가 true이면 DisconnectionNotice UI 표시
  const disconnectedItem = () => {
    return isDisconnected && <DisconnectionNotice />;
  };

  return { setStorageDisconnected, disconnectedItem, isDisconnected };
};
