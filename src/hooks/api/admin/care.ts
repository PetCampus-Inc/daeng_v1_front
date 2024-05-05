import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleCreateCareDogs,
  handleDeleteCareDogs,
  handleGetCareDogs,
  handleGetNewCareDogs
} from "apis/admin.caredog.api";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import type { ICareDogInfo } from "types/admin/care.types";

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

export const useCreateCareDogs = (openPopup: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSuccess = (data: ICareDogInfo[]) => {
    if (!data.length) {
      // 추가 요청 성공
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_LIST });
      navigate(PATH.ADMIN_CARE);
      return;
    }

    const isConflicted = data.some((dog) => dog.conflicted);
    if (isConflicted) {
      // 추가 요청 실패
      openPopup();
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
      // 추가 요청 성공, but 이전 기록이 있는 강아지
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_LIST });
      // 뮤테이션 결과를 queryCache에 저장
      queryClient.setQueryData(QUERY_KEY.CACHED_CARE_DOG_INFO, data);
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
