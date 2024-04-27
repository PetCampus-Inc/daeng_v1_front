import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetMemberEnrollmentForm } from "apis/admin/enrollment.api";
import { handleGetAdminForm, handlePostAdminForm } from "apis/member/school.api";
import { Adapter } from "libs/Adapter";
import {
  EditModeAdapter,
  MemberFormAdapter,
  ReadModeAdapter
} from "libs/Adapter/ServerToFormAdapter";

import type {
  IMemberForm,
  IRequestAdminEnrollment,
  IResponseAdminForm,
  TPickDropState
} from "types/admin/enrollment.types";

export type MemberFormAdaptedData = Omit<
  IMemberForm,
  "pickDropState" | "requiredItemList" | "roundTicketNumber" | "monthlyTicketNumber" | "agreements"
> & {
  pickDropState: TPickDropState;
  requiredItemList: Map<number, boolean>;
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  agreements: { [key: number]: boolean };
};

// 대기 목록 가입신청서 조회
// FIXME: 타입 수정 필요함!!!!!!
export const useGetMemberEnrollment = (formId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_ENROLLMENT(formId),
    queryFn: () => handleGetMemberEnrollmentForm(formId),
    select: (data) =>
      Adapter.from(data).to<IMemberForm, MemberFormAdaptedData>((item) => {
        const adapterInstance = new MemberFormAdapter(item);
        return adapterInstance.adapt();
      })
  });
};

export type FormAdaptedData<Mode extends "READ" | "EDIT"> = Omit<
  IResponseAdminForm,
  "requiredItemList" | "pickDropState" | "roundTicketNumber" | "monthlyTicketNumber"
> & {
  requiredItemList: Mode extends "READ" ? Map<number, boolean> : boolean[];
  pickDropState: string;
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
  const enlistmentQuery = useSuspenseQuery<IResponseAdminForm, Error, FormAdaptedData<typeof mode>>(
    {
      queryKey: QUERY_KEY.ADMIN_ENROLLMENT(formId),
      queryFn: () => handleGetAdminForm({ formId }),
      select: (data) =>
        Adapter.from(data).to<IResponseAdminForm, FormAdaptedData<typeof mode>>((item) => {
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
  const mutateForm = useMutation({
    mutationFn: (enrollmentData: IRequestAdminEnrollment) => handlePostAdminForm(enrollmentData),
    throwOnError: true
  });

  return { mutateForm: mutateForm.mutate };
};