import customAxios from "libs/CustomAxios";
import { IPrincipalInfo, ITeacherInfo } from "types/admin.mypage.type";

export const handleGetPrincipalInfo = async (adminId: number): Promise<IPrincipalInfo> => {
  const url = `admin/owner/mypage`;
  const { data } = await customAxios.get(url, {
    params: {
      adminId
    }
  });
  return data.data;
};

export const handleGetTeacherInfo = async (adminId: number): Promise<ITeacherInfo> => {
  const url = `admin/teacher/mypage`;
  const { data } = await customAxios.get(url, {
    params: {
      adminId
    }
  });
  return data.data;
};
