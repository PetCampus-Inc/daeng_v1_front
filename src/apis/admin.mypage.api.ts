import { request } from "libs/CustomAxios/request";
import { IOwnerInfo, ITeacherInfo } from "types/admin.mypage.type";
import { IResponse } from "types/helper.type";

export const handleGetPrincipalInfo = async (adminId: number): Promise<IOwnerInfo> => {
  const url = `admin/owner/mypage`;
  const { data } = await request<IResponse<IOwnerInfo>>({
    url,
    params: {
      adminId
    }
  });
  return data;
};

export const handleGetTeacherInfo = async (adminId: number): Promise<ITeacherInfo> => {
  const url = `admin/teacher/mypage`;
  const { data } = await request<IResponse<ITeacherInfo>>({
    url,
    params: {
      adminId
    }
  });
  return data;
};
