import { routes } from "constants/path";
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

import type { CareDogInfo, PastAgenda } from "types/admin/care.types";

export const useGetCareDogList = (initialData: CareDogInfo[]) => {
  return useSuspenseQuery<CareDogInfo[]>({
    queryKey: QUERY_KEY.CARE_DOG_LIST,
    queryFn: () => handleGetCareDogs(),
    initialData
  });
};

// 강아지 관리 상세 - 캐시된 강아지 목록 조회
export const useGetCachedCareDog = (dogId: number) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery<CareDogInfo, Error>({
    queryKey: ["careDogDetail", dogId],
    queryFn: async () => {
      // 1. 캐시된 리스트 데이터 찾기
      const cachedList = queryClient.getQueryData<CareDogInfo[]>(QUERY_KEY.CARE_DOG_LIST);
      const cachedDog = cachedList?.find((dog) => dog.dogId === dogId);

      if (cachedDog) {
        return cachedDog;
      }

      // 2. 캐시에 없다면 메인 페이지 API 다시 호출
      const updatedList = await handleGetCareDogs();
      const updatedDog = updatedList.find((dog) => dog.dogId === dogId);

      if (updatedDog) {
        // 메인 페이지 캐시 업데이트
        queryClient.setQueryData(QUERY_KEY.CARE_DOG_LIST, updatedList);
        return updatedDog;
      }

      // 3. 새로운 리스트에서도 없는경우(e.g. 강아지 삭제) 에러 throw
      throw new Error(`데이터가 존재하지 않습니다. dogId: ${dogId}`);
    },
    staleTime: 5 * 60 * 1000 // 5분 동안 fresh 상태 유지
  });
};

export const useGetNewCareDogs = () => {
  return useSuspenseQuery<CareDogInfo[]>({
    queryKey: QUERY_KEY.NEW_CARE_DOG_LIST,
    queryFn: () => handleGetNewCareDogs()
  });
};

export const useCreateCareDogs = ({
  openBlockingPopup,
  openGuidePopup,
  closeRootPopup
}: {
  openBlockingPopup: () => void;
  openGuidePopup?: () => void;
  closeRootPopup?: () => void;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSuccess = (data: CareDogInfo[]) => {
    if (!data.length) {
      // 추가 요청 성공
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_LIST });
      navigate(routes.admin.care.root);
      // 강아지 추가 팝업 닫기
      closeRootPopup?.();
      return;
    }

    const isConflicted = data.some((dog) => dog.conflicted);
    if (isConflicted) {
      // 추가 요청 실패
      // 이미 선택된 강아지 팝업 열기
      openBlockingPopup();
      const currentDogs = queryClient.getQueryData<CareDogInfo[]>(QUERY_KEY.NEW_CARE_DOG_LIST);
      if (currentDogs) {
        const updatedDogs = currentDogs.map((existingDog) => {
          const newDogData = data.find(
            (newDog) => newDog.dogId === existingDog.dogId && newDog.conflicted
          );
          return newDogData ? { ...existingDog, ...newDogData } : existingDog;
        });
        queryClient.setQueryData<CareDogInfo[]>(QUERY_KEY.NEW_CARE_DOG_LIST, updatedDogs);
      }
    } else {
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
  const cachedData = queryClient.getQueryData<CareDogInfo[]>(QUERY_KEY.CACHED_CARE_DOG_INFO);
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
      navigate(routes.admin.care.root);
      showToast("관리 강아지 목록에서 삭제되었습니다", "bottom");
    }
  });

  return { mutateDeleteCareDogs: deleteCareDogsMutation.mutate };
};

// 강아지 사진 전송
export const useCreateAlbum = () => {
  const queryClient = useQueryClient();
  const createAlbumMutation = useMutation({
    mutationFn: handlePostAlbum,
    onSuccess: () => {
      showToast("사진이 전송이 완료되었습니다", "bottom");
      queryClient.invalidateQueries({
        queryKey: ["mainAlbum"] // 사진 앨범 쿼리 무효화
      });
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_AGENDA_SAVED });
      showToast("임시 저장되었습니다", "bottom");
    },
    onError: () => {
      showToast("에러가 발생했습니다. 잠시후 다시 시도해주세요", "bottom");
    }
  });

  return {
    mutateTempSaveCareDog: tempSaveCareDog.mutate,
    isTempSavePending: tempSaveCareDog.isPending
  };
};

// 강아지 알림장 정보 가져오기
export const useGetAgendaSaved = (dogId: number) => {
  return useSuspenseQuery<PastAgenda>({
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_AGENDA_SAVED });
      showToast("알림장 전송이 완료되었습니다", "bottom");
    },
    onError: () => {
      showToast("에러가 발생했습니다. 잠시후 다시 시도해주세요", "bottom");
    }
  });

  return { mutateSendAgenda: sendAgenda.mutate, isSendAgendaPending: sendAgenda.isPending };
};

// 강아지 지난 알림장 정보 가져오기
export const useGetPastAgenda = (dogId: number) => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<PastAgenda[]>([
    ...QUERY_KEY.CARE_DOG_PAST_AGENDA,
    dogId
  ]);

  return useSuspenseQuery<PastAgenda[]>({
    queryKey: QUERY_KEY.CARE_DOG_PAST_AGENDA,
    queryFn: () => handleGetPastAgenda(dogId),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    initialData: cachedData
  });
};
