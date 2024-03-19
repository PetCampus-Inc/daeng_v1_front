import { LIST } from "constants/option";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleCallMember,
  handleDeleteDog,
  handleGetAttendDogs,
  handleGetAttendSearchDogs,
  handleGetSearchDogs,
  handlePostAttend,
  handleSortCharge,
  handleSortDate,
  handleSortPayment
} from "apis/admin.attendance.api";
import showToast from "utils/showToast";

export const useGetAttendDogList = (schoolId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.ATTEND_LIST,
    queryFn: () => handleGetAttendDogs(schoolId)
  });
};

export const useAttendDogSearchQuery = (schoolId: number, searchText?: string) => {
  return useQuery({
    queryKey: QUERY_KEY.ATTEND_LIST_SEARCH(schoolId, searchText),
    queryFn: () => handleGetAttendSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export const useDogSearchQuery = (schoolId: number, searchText?: string) => {
  return useQuery({
    queryKey: QUERY_KEY.ATTENDANCE_LIST_SEARCH(schoolId, searchText),
    queryFn: () => handleGetSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export const useCreateAttendDog = () => {
  const queryClient = useQueryClient();
  const attendDogMutation = useMutation({
    mutationFn: handlePostAttend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ATTENDANCE_LIST });
    }
  });
  return { mutateAttend: attendDogMutation.mutate };
};

export const useDeleteAttendDog = () => {
  const queryClient = useQueryClient();
  const deleteDogMutation = useMutation({
    mutationFn: (dogId: number) => handleDeleteDog(dogId),
    onSuccess: () => {
      showToast("강아지가 삭제되었습니다", "bottom");
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ATTENDANCE_LIST });
    }
  });
  return { mutateDelete: deleteDogMutation.mutate };
};

export const useCallMember = (dogId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.MEMBER_PHONE_NUMBER(dogId),
    queryFn: () => handleCallMember(dogId),
    enabled: false
  });
};

interface Props {
  sortName: string;
  schoolId: number;
  adminId: number;
}

const fetchSortedDogs = async ({ sortName, schoolId, adminId }: Props) => {
  switch (sortName) {
    case LIST.REGISTERED:
      return await handleGetSearchDogs(schoolId);
    case LIST.PAYMENT:
      return await handleSortPayment(schoolId);
    case LIST.DATE:
      return await handleSortDate(schoolId);
    case LIST.CHARGE:
      return await handleSortCharge(schoolId, adminId);
    default:
      return await handleGetSearchDogs(schoolId);
  }
};

export const useDogListAndSortedList = ({ sortName, schoolId, adminId }: Props) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.ATTENDANCE_LIST_SORTNAME(sortName),
    queryFn: () => fetchSortedDogs({ sortName, schoolId, adminId }),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000
  });
};
