import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetDogAndMemberDetails } from "apis/admin/attendance.api";
import { type IDogAndMemberInfo } from "types/admin/attendance.type";

const useGetDogAndMemberDetail = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: ["getDogAndMemberDetail", dogId],
    queryFn: () => handleGetDogAndMemberDetails(dogId),
    staleTime: 1000 * 60 * 60,
    select: ({ data }) => {
      const { member, ...dogInfo } = data as IDogAndMemberInfo;
      return {
        dogInfo,
        memberInfo: member
      };
    }
  });
};

export default useGetDogAndMemberDetail;
