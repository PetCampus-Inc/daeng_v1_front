import { request } from "libs/CustomAxios/request";
import { IResponse } from "types/helper.type";

import type { MemberFormData } from "types/admin/enrollment.types";

// 대기 중 견주 가입신청서 보기
// description: 승인 대기중인 견주의 가입신청서를 보여줍니다.
export const handleGetMemberEnrollmentForm = async (
  enrollmentFormId: string
): Promise<MemberFormData> => {
  const url = `admin/enrollment/${enrollmentFormId}`;
  const { data } = await request<IResponse<MemberFormData>>({ url });
  return data;
};
