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
  handleSendAgenda,
  handleTempSaveCareDog
} from "apis/admin.caredog.api";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import type { ICareDogInfo, ICareTempSave, IPastAgenda } from "types/admin/care.types";

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

  const createCareDogsMutation = useMutation({
    mutationFn: handleCreateCareDogs,
    onSuccess: (data) => {
      if (data.length > 0) {
        openPopup();
        queryClient.setQueryData<ICareDogInfo[]>(QUERY_KEY.NEW_CARE_DOG_LIST, data);
      } else {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.CARE_DOG_LIST });
        navigate(PATH.ADMIN_CARE);
      }
    }
  });
  return { mutateCreateCareDogs: createCareDogsMutation.mutate };
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
  return useSuspenseQuery<ICareTempSave>({
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
  return useSuspenseQuery<IPastAgenda[]>({
    queryKey: QUERY_KEY.CARE_DOG_PAST_AGENDA,
    queryFn: () => handleGetPastAgenda(dogId)
  });
};
