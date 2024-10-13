import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleCreateEnrollmentForm,
  handleDeleteEnrollmentForm,
  handleGetAdminForm,
  handleGetMemberEnrollmentForm,
  handleGetSchoolForm
} from "apis/admin/enrollment.api";
import { Adapter } from "libs/adapters";
import {
  SchoolFormDetailAdapter,
  EditSchoolFormAdapter,
  MemberForm2FeForAdminAdapter,
  type SchoolFormReadType,
  type SchoolFormEditType
} from "libs/adapters/ServerToFormAdapter";

import type { MemberFormData } from "types/admin/enrollment.types";
import type { EnrollmentDataType } from "types/member/enrollment.types";

// 견주 가입신청서 조회
export const useGetMemberEnrollment = (formId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_ENROLLMENT(formId),
    queryFn: () => handleGetMemberEnrollmentForm(formId),
    select: (data) =>
      Adapter.from(data).to((item: MemberFormData) =>
        new MemberForm2FeForAdminAdapter(item).adapt()
      )
  });
};

export type FormAdaptedData<Mode extends "READ" | "EDIT"> = Mode extends "READ"
  ? SchoolFormReadType
  : SchoolFormEditType;
type Mode = "READ" | "EDIT";

// 유치원 가입신청서 조회, 수정
export const useGetSchoolForm = (formId: number, mode: Mode) => {
  return useSuspenseQuery<EnrollmentDataType, Error, FormAdaptedData<typeof mode>>({
    queryKey: QUERY_KEY.SCHOOL_ENROLLMENT(formId),
    queryFn: () => handleGetAdminForm(formId),
    select: (data) =>
      Adapter.from(data).to((item: EnrollmentDataType) => {
        const adapterInstance =
          mode === "READ" ? new SchoolFormDetailAdapter(item) : new EditSchoolFormAdapter(item);
        return adapterInstance.adapt();
      })
  });
};

// 유치원 가입신청서 저장
export const useCreateSchoolForm = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handleCreateEnrollmentForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.SCHOOL_ENROLLMENT_LIST });
    }
  });

  return { mutateForm: mutate };
};

// 유치원 가입신청서 삭제
export const useDeleteSchoolForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: handleDeleteEnrollmentForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.SCHOOL_ENROLLMENT_LIST });
    },
    onError: (error) => {
      console.log("가입신청서 삭제 실패", error);
    }
  });

  // FIXME: api Params가 단일값만 가능해서 배열도 처리할 수 있도록 임시 조치함
  // 백엔드 API 수정 후에 제거 필요!!
  const mutateDeleteEnrollments = async (ids: number[]) => {
    try {
      for (const id of ids) {
        await mutateAsync(id);
      }
    } catch (error) {
      console.log("가입신청서 일괄 삭제 실패", error);
    }
  };

  return { mutateDeleteEnrollments };
};

// 유치원 가입신청서 목록 조회
export const useGetSchoolFormList = (schoolId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.SCHOOL_ENROLLMENT_LIST,
    queryFn: () => handleGetSchoolForm(schoolId),
    staleTime: 5 * 60 * 1000
  });
};
