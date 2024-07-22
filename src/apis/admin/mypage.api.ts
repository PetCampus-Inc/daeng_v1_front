import { request } from "libs/AuthAxios/request";

import type { IOwnerInfo, ITeacherInfo } from "types/admin/mypage.types";

export const handleGetPrincipalInfo = async (adminId: number) => {
  const url = `admin/owner/mypage`;
  const { data } = await request<IOwnerInfo>({
    url,
    params: {
      adminId
    }
  });
  return data;
};

export const handleGetTeacherInfo = async (adminId: number) => {
  const url = `admin/teacher/mypage`;
  const { data } = await request<ITeacherInfo>({
    url,
    params: {
      adminId
    }
  });
  return data;
};
