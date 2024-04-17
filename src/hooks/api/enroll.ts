import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetEnrollment, handlePostEnrollment } from "apis/school.api";

import type { IEnrollmentProps } from "apis/school.api";
import type {
  IAdminEnrollment,
  IMemberDto,
  IPickDropInfo,
  IPolicyInfo,
  IRequestEnrollment,
  ITicketInfo
} from "types/School.type";

interface EnrollmentProps {
  requiredItemsMap: Map<number, boolean>;
  memberInfo: IMemberDto | null;
  ticketInfo: ITicketInfo;
  policyInfo: IPolicyInfo;
  pickDropInfo: IPickDropInfo;
}

// FIXME: 어뎁터 패턴 사용하기
export const useGetEnrollment = ({ memberId, schoolId }: IEnrollmentProps) => {
  return useSuspenseQuery<IAdminEnrollment, Error, EnrollmentProps>({
    queryKey: QUERY_KEY.ENROLLMENT(schoolId, memberId),
    queryFn: () => handleGetEnrollment({ schoolId, memberId }),
    refetchOnWindowFocus: false,
    select: (data) => {
      // 이용권 정보
      const selectTicketInfo = () => ({
        priceInfo: data.priceInfo,
        ticketType: data.ticketType,
        roundTicketNumber: data.roundTicketNumber,
        openDays: data.openDays,
        monthlyTicketNumber: data.monthlyTicketNumber,
        ticketInfo: data.ticketInfo
      });

      // 정책 정보
      const selectPolicyInfo = () => ({
        limitsInfo: data.limitsInfo,
        accidentInfo: data.accidentInfo,
        abandonmentInfo: data.abandonmentInfo
      });

      // 픽드랍 정보
      const selectPickDrop = () => ({
        pickDropState: data.pickDropState,
        pickDropMemo: data.pickDropMemo,
        pickDropInfo: data.pickDropInfo,
        pickDropNotice: data.pickDropNotice
      });

      // 필수 항목 리스트
      const requiredItemsMap: Map<number, boolean> = new Map(
        data.requiredItemList.map((itemNumber: number) => [itemNumber, true])
      );

      return {
        requiredItemsMap,
        memberInfo: data.memberDto,
        ticketInfo: selectTicketInfo(),
        policyInfo: selectPolicyInfo(),
        pickDropInfo: selectPickDrop()
      };
    }
  });
};

export const usePostEnrollment = () => {
  const enrollMutation = useMutation({
    mutationFn: (enrollmentData: IRequestEnrollment) => handlePostEnrollment(enrollmentData),
    throwOnError: true
  });

  return enrollMutation.mutate;
};
