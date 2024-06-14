import { request } from "libs/CustomAxios/request";

import type { IOwnerInfo, ITeacherInfo } from "types/admin/mypage.types";
import type { Response } from "types/helper.types";

export const handleGetPrincipalInfo = async (adminId: number): Promise<IOwnerInfo> => {
  const url = `admin/owner/mypage`;
  const { data } = await request<Response<IOwnerInfo>>({
    url,
    params: {
      adminId
    }
  });
  return data;
};

export const handleGetTeacherInfo = async (adminId: number): Promise<ITeacherInfo> => {
  const url = `admin/teacher/mypage`;
  const { data } = await request<Response<ITeacherInfo>>({
    url,
    params: {
      adminId
    }
  });
  return data;
};
