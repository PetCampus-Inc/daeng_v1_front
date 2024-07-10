import { LIST, type TSortOptionList } from "constants/option";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleCallMember,
  handleDeleteDog,
  handleGetAttendDogs,
  handleGetAttendSearchDogs,
  handleGetDogDetail,
  handleGetDogInfoRecord,
  handleGetSearchDogs,
  handlePostAttend,
  handleSortCharge,
  handleSortDate,
  handleSortPayment
} from "apis/admin/attendance.api";
import { format } from "date-fns";
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

// FIXME: prefecth를 사용하여 전화번호를 미리 가져오는 방법으로 변경 필요
export const useCallMember = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_PHONE_NUMBER(dogId),
    queryFn: () => handleCallMember(dogId)
  });
};

interface Props {
  sortName: TSortOptionList;
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

// 강아지 상세 - 강아지 정보 조회
export const useGetDogDetail = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: ["dogDetail", dogId],
    queryFn: () => handleGetDogDetail(dogId),
    staleTime: 1000 * 60 * 60,
    select: (data) => {
      const { member, ...dogInfo } = data;
      return {
        dogInfo,
        memberInfo: member
      };
    }
  });
};

// 강아지 상세 - 등원기록 조회
export const useGetDogInfoRecord = (dogId: number, date?: string) => {
  return useSuspenseQuery({
    queryKey: ["dogInfoRecord", dogId, date],
    queryFn: () => handleGetDogInfoRecord(dogId, date),
    select: (data) => data.map((item) => format(item.date.join("-"), "yyyy-MM-dd")),
    staleTime: 1000 * 60 * 60
  });
};
