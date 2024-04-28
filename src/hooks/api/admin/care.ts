import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleCreateCareDogs,
  handleDeleteCareDogs,
  handleGetCareDogs,
  handleGetNewCareDogs,
  handlePostAlbum
} from "apis/admin/care.api";
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

export const useCreateAlbum = () => {
  const createAlbumMutation = useMutation({
    mutationFn: handlePostAlbum,
    onSuccess: () => {
      showToast("사진이 전송이 완료되었습니다", "bottom");
    }
  });
  return { mutateAlbum: createAlbumMutation.mutate };
};
