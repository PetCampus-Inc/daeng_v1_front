import { QUERY_KEY } from "constants/queryKey";

import { useQueryClient } from "@tanstack/react-query";
import DisconnectionNotice from "components/Home/DisconnectionNotice/DisconnectionNotice";
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";
import { HomeDataType } from "types/member/main.types";

import { useLocalStorage, useSetLocalStorage } from "../useLocalStorage";

/**
 * 유치원 연결이 끊긴 강아지 여부 및 끊긴 상태인 경우 해당 UI를 표시합니다.
 * @returns setStorageDisconnected, disconnectedItem, isDisconnected
 */
export const useDogDisconnected = () => {
  const DOG_DIS_CONNECTIED = "DOG-DIS-CONNECTIED";

  const queryClient = useQueryClient();
  const setStorage = useSetLocalStorage();
  const [selectedDogId] = useRecoilState(dogIdState);
  const [storageDisconnected] = useLocalStorage(DOG_DIS_CONNECTIED, false);

  const cacheDogData =
    (queryClient.getQueryData(QUERY_KEY.HOME(Number(selectedDogId))) as HomeDataType) ?? "";

  // disconnected
  const isDisconnected = cacheDogData ? cacheDogData.disconnected : storageDisconnected;

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
