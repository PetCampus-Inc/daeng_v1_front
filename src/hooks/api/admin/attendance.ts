import { QUERY_KEY } from "constants/queryKey";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery
} from "@tanstack/react-query";
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
} from "apis/admin/attendance.api";
import { SORT_OPTIONS, type SortOptions } from "components/Admin/Attendance";
import showToast from "utils/showToast";

export const useGetAttendDogList = (schoolId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.ATTEND_LIST,
    queryFn: () => handleGetAttendDogs(schoolId)
  });
};

export const useAttendDogSearchQuery = (schoolId: number, searchText?: string) => {
  return useQuery({
    queryKey: QUERY_KEY.ATTEND_LIST_SEARCH(searchText),
    queryFn: () => handleGetAttendSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export const useDogSearchQuery = (schoolId: number, searchText?: string) => {
  return useQuery({
    queryKey: QUERY_KEY.ATTENDANCE_LIST_SEARCH(searchText),
    queryFn: () => handleGetSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export const usePostAttendDog = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handlePostAttend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ATTENDANCE_LIST });
      queryClient.removeQueries({ queryKey: QUERY_KEY.ATTEND_LIST }); // 출석안한 강아지 리스트 캐시 삭제
    }
  });
  return { mutateAttend: mutate };
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

/**
 * 출석부 - 메인 조회
 */
export const useDogListAndSortedList = ({
  sortName,
  schoolId
}: {
  sortName: SortOptions;
  schoolId: number;
}) => {
  const fetchSortedDogs = async () => {
    switch (sortName) {
      case SORT_OPTIONS.REGISTERED:
        return await handleGetSearchDogs(schoolId);
      case SORT_OPTIONS.PAYMENT:
        return await handleSortPayment(schoolId);
      case SORT_OPTIONS.DATE:
        return await handleSortDate(schoolId);
      case SORT_OPTIONS.CHARGE:
        return await handleSortCharge(schoolId);
      default:
        return await handleGetSearchDogs(schoolId);
    }
  };

  return useQuery({
    queryKey: [QUERY_KEY.ATTENDANCE_LIST_SORTNAME, sortName, schoolId],
    queryFn: fetchSortedDogs,
    /**
     * keepPreviousData를 사용하여 이전 데이터를 유지
     * @see {@link https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5#removed-keeppreviousdata-in-favor-of-placeholderdata-identity-function}
     */
    placeholderData: keepPreviousData,
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000
  });
};
