import { type AgreementsListType } from "constants/item";
import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetMemberEnrollmentForm } from "apis/admin/enrollment.api";
import { handleGetAdminForm, handlePostAdminForm } from "apis/member/enrollment.api";
import { Adapter } from "libs/adapters";
import {
  EditModeAdapter,
  MemberFormAdapter,
  ReadModeAdapter
} from "libs/adapters/ServerToFormAdapter";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import type { MemberFormData, AdminEnrollmentInfoType } from "types/admin/enrollment.types";
import type { EnrollmentDataType } from "types/member/enrollment.types";

// FIXME: Omit 타입을 사용하면서 필요없는 타입을 제거하는 것이 아닌 새로운 타입을 만드는게 나을 것 같습니다.
export type MemberFormAdaptedData = Omit<
  MemberFormData,
  | "requiredItemList"
  | "agreements"
  | "memberGender"
  | "dogGender"
  | "dogSize"
  | "neutralization"
  | "vaccination"
  | "enrollmentTicketType"
  | "pickDropRequest"
  | "pickDropType"
> & {
  requiredItemList: Map<number, boolean>;
  agreements: AgreementsListType;
  openDays: string[];
  roundTicketNumber: number[];
  monthlyTicketNumber: number[];
  memberGender: string;
  dogGender: string;
  dogSize: string;
  neutralization: string;
  vaccination: string;
  enrollmentTicketType: string;
  pickDropRequest: string;
  pickDropType: string;
};

// 견주 가입신청서 조회
export const useGetMemberEnrollment = (formId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_ENROLLMENT(formId),
    queryFn: () => handleGetMemberEnrollmentForm(formId),
    select: (data) =>
      Adapter.from(data).to<MemberFormData, MemberFormAdaptedData>((item) => {
        const adapterInstance = new MemberFormAdapter(item);
        return adapterInstance.adapt();
      })
  });
};

export type FormAdaptedData<Mode extends "READ" | "EDIT"> = Omit<
  EnrollmentDataType,
  "requiredItemList" | "pickDropState" | "roundTicketNumber" | "monthlyTicketNumber" | "ticketType"
> & {
  requiredItemList: Mode extends "READ" ? Map<number, boolean> : boolean[];
  pickDropState: string;
  ticketType: string[];
  roundTicketNumber: Mode extends "READ"
    ? number[]
    : {
        value: number;
      }[];
  monthlyTicketNumber: Mode extends "READ"
    ? number[]
    : {
        value: number;
      }[];
};

type Mode = "READ" | "EDIT";

// 원장 가입신청서 조회, 수정
export const useAdminEnrollment = (formId: string, mode: Mode) => {
  const enlistmentQuery = useSuspenseQuery<EnrollmentDataType, Error, FormAdaptedData<typeof mode>>(
    {
      queryKey: QUERY_KEY.ADMIN_ENROLLMENT(formId),
      queryFn: () => handleGetAdminForm({ formId }),
      select: (data) =>
        Adapter.from(data).to<EnrollmentDataType, FormAdaptedData<typeof mode>>((item) => {
          const adapterInstance =
            mode === "READ" ? new ReadModeAdapter(item) : new EditModeAdapter(item);
          return adapterInstance.adapt();
        })
    }
  );

  return enlistmentQuery;
};

// 원장 가입신청서 저장
export const useCreateAdminEnrollment = () => {
  const navigate = useNavigate();
  const mutateForm = useMutation({
    mutationFn: (enrollmentData: AdminEnrollmentInfoType) => handlePostAdminForm(enrollmentData),
    onSuccess: () => {
      navigate(PATH.ADMIN_ENROLLMENT);
      showToast("가입신청서 등록이 완료되었습니다", "bottom");
    },
    throwOnError: true
  });

  return { mutateForm: mutateForm.mutate };
};
