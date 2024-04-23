import { request } from "libs/CustomAxios/request";
import { IResponse } from "types/helper.type";

import type { IResponseMemberForm } from "types/admin/enrollment.types";

// 대기 목록 가입신청서 보기
export const handleGetMemberEnrollmentForm = async (
  enrollmentFormId: string
): Promise<IResponseMemberForm> => {
  const url = `admin/enrollment/${enrollmentFormId}`;
  const { data } = await request<IResponse<IResponseMemberForm>>({ url });
  return data;
};
