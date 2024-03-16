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

import type { ICareDogInfo, ICareDogProps } from "types/admin.caredog.type";

export const useGetCareDogList = (adminId: number) => {
  return useSuspenseQuery<ICareDogInfo[]>({
    queryKey: QUERY_KEY.CARE_DOG_LIST,
    queryFn: () => handleGetCareDogs(adminId)
  });
};

export const useGetNewCareDogs = (adminId: number) => {
  return useSuspenseQuery<ICareDogInfo[]>({
    queryKey: QUERY_KEY.NEW_CARE_DOG_LIST,
    queryFn: () => handleGetNewCareDogs(adminId)
  });
};

export const useCreateCareDogs = (open: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createCareDogsMutation = useMutation({
    mutationFn: handleCreateCareDogs,
    onSuccess: (data) => {
      if (data.length > 0) {
        console.log("선택 안됨");
        open();
        queryClient.setQueryData<ICareDogInfo[]>(QUERY_KEY.NEW_CARE_DOG_LIST, data);
      } else {
        console.log("선택 완료");
        navigate(PATH.ADMIN_CARE_DOG, { state: { isFirstEntry: false } });
      }
    }
  });
  return { MutateCreateCareDogs: createCareDogsMutation.mutate };
};

export const useDeleteCareDogs = (req: ICareDogProps) => {
  const queryClient = useQueryClient();
  const deleteCareDogsMutation = useMutation({
    mutationFn: () => handleDeleteCareDogs(req),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.NEW_CARE_DOG_LIST })
  });

  return { MutateDeleteCareDogs: deleteCareDogsMutation.mutate };
};
