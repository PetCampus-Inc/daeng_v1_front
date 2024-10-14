import authAxios from "libs/AuthAxios";

import type { MemberFormData, SchoolFormList } from "types/admin/enrollment.types";
import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";
import type { EnrollmentDataType } from "types/member/enrollment.types";

/**
 * @description 견주 가입신청서 보기 - 승인 대기중인 견주의 가입신청서를 보여줍니다.
 * @param {number} formId
 */
export const handleGetMemberEnrollmentForm = async (formId: number): Promise<MemberFormData> => {
  const url = `admin/enrollment/${formId}`;
  const { data } = await authAxios.get(url);
  return data.data;
};

/**
 * @description 가입신청서 목록 - 원장이 작성한 가입신청서 목록을 보여줍니다.
 * @param {number} schoolId
 */
export const handleGetSchoolForm = async (schoolId: number): Promise<SchoolFormList[]> => {
  const url = `school/form/list`;
  const { data } = await authAxios.get(url, { params: { schoolId } });
  return data.data;
};

/**
 * @description 가입신청서 미리보기 - 원장이 작성한 가입신청서 미리보기 페이지를 반환합니다.
 * @param {number} formId
 */
export const handleGetAdminForm = async (formId: number): Promise<EnrollmentDataType> => {
  const url = `school/form/list/${formId}`;
  const { data } = await authAxios.get(url);
  return data.data;
};

/**
 * @description 가입신청서 등록 - 원장이 작성한 가입신청서를 저장합니다.
 * @param {AdminEnrollmentInfoType} req
 */
export const handleCreateEnrollmentForm = async (req: AdminEnrollmentInfoType): Promise<void> => {
  const url = "school/form";
  return await authAxios.post(url, {
    data: { ...req }
  });
};

/**
 * @description 가입신청서 삭제 - 원장의 가입신청서를 삭제합니다.
 * @param {number} schoolFormId
 */
export const handleDeleteEnrollmentForm = async (schoolFormId: number): Promise<void> => {
  const url = "admin/delete/enrollment";
  return await authAxios.post(url, null, { params: { schoolFormId } });
};
