import customAxios from "libs/CustomAxios";
import { request } from "libs/CustomAxios/request";

import type { MemberFormData } from "types/admin/enrollment.types";
import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";
import type { Response } from "types/helper.types";
import type { EnrollmentDataType, IEnrollmentStatus } from "types/member/enrollment.types";

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

/**
 * @description 가입신청서 상태를 반환합니다.
 * @param {IEnrollmentStatus} enrollmentFormId
 * @returns
 */
export const handleGetEnrollmentStatus = async (
  enrollmentFormId: number[]
): Promise<IEnrollmentStatus[]> => {
  const req = enrollmentFormId.map(async (id) => {
    const url = `admin/enrollment/status?enrollmentFormId=${id}`;
    const { data } = await customAxios.get(url);
    return data.data;
  });

  return Promise.all(req);
};
