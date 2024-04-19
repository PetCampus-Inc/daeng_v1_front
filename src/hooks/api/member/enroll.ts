import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  IEnrollmentProps,
  handleGetEnrollment,
  handlePostEnrollment
} from "apis/member/school.api";
import { Adapter } from "libs/Adapter";
import { ReadModeAdapter } from "libs/Adapter/ServerToFormAdapter";
import { useSetRecoilState } from "recoil";
import { memberInfoState } from "store/form";

import type { IResponseAdminForm } from "types/admin/enrollment.types";
import type {
  IRequestEnrollment,
  IResponseEnrollment,
  TMemberDto,
  TPickDropState
} from "types/member/enrollment.types";

export type ReturnType = Omit<
  IResponseEnrollment,
  | "requiredItemList"
  | "pickDropState"
  | "roundTicketNumber"
  | "monthlyTicketNumber"
  | "schoolFormName"
  | "member"
> & {
  requiredItemList: Map<number, boolean>;
  pickDropState: TPickDropState;
  roundTicketNumber: number[];
  monthlyTicketNumber: number[];
};

// 견주 가입신청서 조회
export const useGetEnrollment = ({ memberId, schoolId }: IEnrollmentProps) => {
  // const setMemberInfo = useSetRecoilState(memberInfoState);

  return useSuspenseQuery<IResponseEnrollment, Error, ReturnType>({
    queryKey: QUERY_KEY.ENROLLMENT(schoolId, memberId),
    queryFn: () => handleGetEnrollment({ schoolId, memberId }),
    refetchOnWindowFocus: false,
    select: (data): ReturnType => {
      const { schoolFormName, ...rest } = data;

      // setMemberInfo({
      //   member: rest.member,
      //   schoolFormId: rest.schoolFormId,
      //   schoolFormName
      // });

      const formdata = Adapter.from(rest).to<IResponseAdminForm, ReturnType>((item) => {
        const adapterInstance = new ReadModeAdapter(item);
        return adapterInstance.adapt();
      });

      return { ...formdata, pickDropState: rest.pickDropState };
    }
  });
};

// 견주 가입신청서 등록
export const usePostEnrollment = () => {
  const enrollMutation = useMutation({
    mutationFn: (enrollmentData: IRequestEnrollment) => handlePostEnrollment(enrollmentData),
    throwOnError: true
  });

  return enrollMutation.mutate;
};
