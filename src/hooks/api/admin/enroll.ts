import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleDeleteEnrollment,
  handleGetAdminForm,
  handleGetEnrollmentStatus,
  handleGetMemberEnrollmentForm,
  handlePostAdminForm
} from "apis/admin/enrollment.api";
import { Adapter } from "libs/adapters";
import {
  AdminFormDetailAdapter,
  AdminFormEditAdapter,
  MemberFormAdapter
} from "libs/adapters/ServerToFormAdapter";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import type { AdminEnrollmentInfoType, MemberFormData } from "types/admin/enrollment.types";
import type { EnrollmentDataType } from "types/member/enrollment.types";

// 견주 가입신청서 조회
export const useGetMemberEnrollment = (formId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_ENROLLMENT(formId),
    queryFn: () => handleGetMemberEnrollmentForm(formId),
    select: (data) =>
      Adapter.from(data).to((item: MemberFormData) => {
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
  return useSuspenseQuery<EnrollmentDataType, Error, FormAdaptedData<typeof mode>>({
    queryKey: QUERY_KEY.ADMIN_ENROLLMENT(formId),
    queryFn: () => handleGetAdminForm(formId),
    select: (data) =>
      Adapter.from(data).to((item: EnrollmentDataType) => {
        const adapterInstance =
          mode === "READ" ? new AdminFormDetailAdapter(item) : new AdminFormEditAdapter(item);
        return adapterInstance.adapt();
      })
  });
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

// 가입 신청서 상태를 확인
export const useGetEnrollmentStatus = (enrollmentFormIds: string[]) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_MAIN_DOG_LIST,
    queryFn: () => handleGetEnrollmentStatus(enrollmentFormIds)
  });
};

// 가입신청서 삭제
export const useDeleteEnrollment = () => {
  const { mutate } = useMutation({
    mutationFn: (enrollmentFormId: string) => handleDeleteEnrollment(enrollmentFormId),
    onSuccess: () => {
      console.log("가입신청서 삭제 성공");
    },
    onError: (error) => {
      console.log("가입신청서 삭제 실패", error);
    }
  });

  return { mutateDeleteEnrollment: mutate };
};
