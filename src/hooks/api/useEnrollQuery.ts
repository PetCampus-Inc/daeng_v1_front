import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetIEnrollment } from "apis/school.api";
import type { IEnrollmentProps } from "apis/school.api";
import type {
  IEnrollment,
  IMemberDto,
  IPickDropInfo,
  IPolicyInfo,
  ITicketInfo
} from "types/School.type";

interface EnrollmentProps {
  requiredItemsMap: Map<number, boolean>;
  memberInfo: IMemberDto;
  ticketInfo: ITicketInfo;
  policyInfo: IPolicyInfo;
  pickDropInfo: IPickDropInfo;
}

export const useEnrollQuery = ({ memberId, schoolId }: IEnrollmentProps) => {
  const enlistmentQuery = useSuspenseQuery<IEnrollment, Error, EnrollmentProps>({
    queryKey: ["enrollment", memberId, schoolId],
    queryFn: () => handleGetIEnrollment({ schoolId, memberId }),
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
      const requiredItemsList = JSON.parse(data.requiredItemList);
      const requiredItemsMap: Map<number, boolean> = new Map(
        requiredItemsList.map((itemNumber: number) => [itemNumber, true])
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

  return { enlistmentQuery };
};
