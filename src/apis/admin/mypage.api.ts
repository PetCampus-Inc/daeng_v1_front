import { request } from "libs/AuthAxios/request";
import { IOwnerProfileEdit } from "types/admin/admin.types";

import type { IOwnerInfo, ITeacherInfo } from "types/admin/mypage.types";

export const handleGetOwnerInfo = async (adminId: number) => {
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

//원장 프로필 수정
export const handleOwnerProfileEdit = async (req: IOwnerProfileEdit) => {
  const url = `admin/owner/profile`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      imageUrl: req.imageUrl,
      adminId: req.adminId,
      adminName: req.adminName,
      phoneNumber: req.phoneNumber
    }
  });
};

//선생님 유치원 끊기
export const handlePostSchoolResigned = async (adminId: number) => {
  const url = `admin/teacher/school`;
  return await request<void>({
    url,
    method: "POST",
    params: {
      adminId
    }
  });
};
