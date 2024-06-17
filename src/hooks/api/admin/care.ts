import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleCreateCareDogs,
  handleDeleteCareDogs,
  handleGetAgenda,
  handleGetCareDogs,
  handleGetNewCareDogs,
  handleGetPastAgenda,
  handlePostAlbum,
  handleSendAgenda,
  handleTempSaveCareDog
} from "apis/admin/care.api";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import type { ICareDogInfo, IPastAgenda } from "types/admin/care.types";

export const useGetCareDogList = (adminId: number, initialData: ICareDogInfo[]) => {
  return useSuspenseQuery<ICareDogInfo[]>({
    queryKey: QUERY_KEY.CARE_DOG_LIST,
    queryFn: () => handleGetCareDogs(adminId),
    initialData
  });
};

export const useGetNewCareDogs = (adminId: number) => {
  return useSuspenseQuery<ICareDogInfo[]>({
    queryKey: QUERY_KEY.NEW_CARE_DOG_LIST,
    queryFn: () => handleGetNewCareDogs(adminId)
  });
};

export const useCreateCareDogs = ({
  openBlockingPopup,
  openGuidePopup
}: {
  openBlockingPopup: () => void;
  openGuidePopup?: () => void;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSuccess = (data: ICareDogInfo[]) => {
    if (!data.length) {
      // 추가 요청 성공

      console.log("정상적으로 처리됨!!!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_LIST });
      navigate(PATH.ADMIN_CARE);
      return;
    }

    const isConflicted = data.some((dog) => dog.conflicted);
    if (isConflicted) {
      // 추가 요청 실패
      openBlockingPopup();
      const currentDogs = queryClient.getQueryData<ICareDogInfo[]>(QUERY_KEY.NEW_CARE_DOG_LIST);
      if (currentDogs) {
        const updatedDogs = currentDogs.map((existingDog) => {
          const newDogData = data.find(
            (newDog) => newDog.dogId === existingDog.dogId && newDog.conflicted
          );
          return newDogData ? { ...existingDog, ...newDogData } : existingDog;
        });
        queryClient.setQueryData<ICareDogInfo[]>(QUERY_KEY.NEW_CARE_DOG_LIST, updatedDogs);
      }
    } else {
      console.log("이전 기록이 있음!!!");
      // 추가 요청 성공, but 이전 기록이 있는 강아지
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_LIST });
      // 뮤테이션 결과를 queryCache 저장
      queryClient.setQueryData(QUERY_KEY.CACHED_CARE_DOG_INFO, data);
      // 이전 기록이 있는 강아지가 있을 경우 가이드 팝업 열기
      openGuidePopup?.();
    }
  };

  const createCareDogsMutation = useMutation({
    mutationFn: handleCreateCareDogs,
    onSuccess,
    meta: {
      mutationCache: {
        maxAge: 3600000 // 1시간 동안 캐시 유지
      }
    }
  });
  return { mutateCreateCareDogs: createCareDogsMutation.mutate };
};

export const useGetCachedCareDogInfo = () => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<ICareDogInfo[]>(QUERY_KEY.CACHED_CARE_DOG_INFO);
  const removeCachedData = () =>
    queryClient.removeQueries({ queryKey: QUERY_KEY.CACHED_CARE_DOG_INFO, exact: true });
  return { data: cachedData ? cachedData : null, removeCachedData };
};

export const useDeleteCareDogs = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteCareDogsMutation = useMutation({
    mutationFn: handleDeleteCareDogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.NEW_CARE_DOG_LIST });
      navigate(PATH.ADMIN_CARE);
      showToast("관리 강아지 목록에서 삭제되었습니다", "bottom");
    }
  });

  return { mutateDeleteCareDogs: deleteCareDogsMutation.mutate };
};

export const useCreateAlbum = () => {
  const createAlbumMutation = useMutation({
    mutationFn: handlePostAlbum,
    onSuccess: () => {
      showToast("사진이 전송이 완료되었습니다", "ownerNav");
    }
  });
  return { mutateAlbum: createAlbumMutation.mutate };
};

// 강아지 알림장 임시저장
export const useTempSaveCareDog = () => {
  const queryClient = useQueryClient();
  const tempSaveCareDog = useMutation({
    mutationFn: handleTempSaveCareDog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_TEMP_SAVE });
      showToast("임시 저장되었습니다", "bottom");
    },
    onError: () => {
      showToast("에러가 발생했습니다. 잠시후 다시 시도해주세요", "bottom");
    }
  });

  return { mutateTempSaveCareDog: tempSaveCareDog.mutate };
};

// 강아지 알림장 정보 가져오기
export const useGetAgendaSaved = (dogId: number) => {
  return useSuspenseQuery<IPastAgenda>({
    queryKey: QUERY_KEY.CARE_DOG_AGENDA_SAVED,
    queryFn: () => handleGetAgenda(dogId)
  });
};

// 알림장 전송
export const useSendAgenda = () => {
  const queryClient = useQueryClient();
  const sendAgenda = useMutation({
    mutationFn: handleSendAgenda,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_TEMP_SAVE });
      showToast("알림장 전송이 완료되었습니다", "bottom");
    },
    onError: () => {
      showToast("에러가 발생했습니다. 잠시후 다시 시도해주세요", "bottom");
    }
  });

  return { mutateSendAgenda: sendAgenda.mutate };
};

// 강아지 지난 알림장 정보 가져오기
export const useGetPastAgenda = (dogId: number) => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<IPastAgenda[]>([
    QUERY_KEY.CARE_DOG_PAST_AGENDA,
    dogId
  ]);

  return useSuspenseQuery<IPastAgenda[]>({
    queryKey: QUERY_KEY.CARE_DOG_PAST_AGENDA,
    queryFn: () => handleGetPastAgenda(dogId),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    initialData: cachedData
  });
};
