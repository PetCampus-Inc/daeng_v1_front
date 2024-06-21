import customAxios from "libs/CustomAxios";
import { request } from "libs/CustomAxios/request";

import type { MemberFormData } from "types/admin/enrollment.types";
import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";
import type { Response } from "types/helper.types";
import type {
  EnrollmentDataType,
  IEnrollmentDeleteData,
  IEnrollmentStatus
} from "types/member/enrollment.types";

/**
 * @description 견주 가입신청서 보기 - 승인 대기중인 견주의 가입신청서를 보여줍니다.
 * @param {string} formId
 */
export const handleGetMemberEnrollmentForm = async (formId: string): Promise<MemberFormData> => {
  const url = `admin/enrollment/${formId}`;
  const { data } = await request<Response<MemberFormData>>({ url });
  return data;
};

/**
 * @description 작성한 가입신청서 미리보기 폼 데이터 반환 - 원장이 작성한 가입신청서 미리보기 페이지를 반환합니다.
 * @param {string} formId
 */
export const handleGetAdminForm = async (formId: string): Promise<EnrollmentDataType> => {
  const url = `school/form/list/${formId}`;
  const { data } = await request<Response<EnrollmentDataType>>({ url });
  return data;
};

/**
 * @description 유치원 가입신청서 폼 저장 - 원장이 작성한 가입신청서를 저장합니다.
 * @param {AdminEnrollmentInfoType} req
 */
export const handlePostAdminForm = async (req: AdminEnrollmentInfoType): Promise<void> => {
  const url = `school/form`;
  return await request({
    url,
    method: "POST",
    data: { ...req }
  });
};

// NOTE 해당 함수들 admin에서 관리하는게 맞는지...?
/**
 * @description 가입신청서 상태 정보 반환 - 견주가 작성한 가입신청서 상태를 확인할 수 있습니다.
 * @param {IEnrollmentStatus} enrollmentFormIds
 * @returns
 */
export const handleGetEnrollmentStatus = async (
  enrollmentFormIds: number[]
): Promise<IEnrollmentStatus[]> => {
  if (!Array.isArray(enrollmentFormIds)) return (enrollmentFormIds = []);

  const req = enrollmentFormIds.map(async (id) => {
    const url = `admin/enrollment/status?enrollmentFormId=${id}`;
    const { data } = await customAxios.get(url);
    return data.data;
  });

  return Promise.all(req);
};

/**
 * @description 가입싱천서 삭제 - 가입신청서를 완전히 삭제합니다.
 * @param {IEnrollmentDeleteData} enrollmentFormId
 * @returns
 */
export const handleDeleteEnrollment = async (
  enrollmentFormId: number
): Promise<IEnrollmentDeleteData> => {
  const url = `admin/delete/enrollment?enrollmentFormId=${enrollmentFormId}`;
  const { data } = await customAxios.post(url);
  return data.data;
};
