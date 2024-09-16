import { request } from "libs/AuthAxios/request";
import { IAdminProfileEdit, ISchoolInfoEdit } from "types/admin/admin.types";

import type { IOwnerInfo, ITeacherInfo } from "types/admin/mypage.types";

/** 원장 마이페이지 */
export const handleGetOwnerInfo = async () => {
  const url = `admin/owner/mypage`;
  const { data } = await request<IOwnerInfo>({ url });
  return data;
};

/** 선생님 마이페이지 */
export const handleGetTeacherInfo = async () => {
  const url = `admin/teacher/mypage`;
  const { data } = await request<ITeacherInfo>({ url });
  return data;
};

//원장 유치원 정보 수정
export const handleSchoolInfoEdit = async (req: ISchoolInfoEdit) => {
  const url = `admin/owner/school`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      adminId: req.adminId,
      schoolId: req.schoolId,
      schoolName: req.schoolName,
      phoneNumber: req.phoneNumber,
      address: req.address
    }
  });
};

//원장 프로필 수정
export const handleOwnerProfileEdit = async (req: IAdminProfileEdit) => {
  const url = `admin/owner/profile`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      imageUrl: req.imageUrl,
      adminName: req.adminName,
      phoneNumber: req.phoneNumber
    }
  });
};

//선생님 프로필 수정
export const handleTeacherProfileEdit = async (req: IAdminProfileEdit) => {
  const url = `admin/teacher/profile`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      imageUrl: req.imageUrl,
      adminName: req.adminName,
      phoneNumber: req.phoneNumber
    }
  });
};

//선생님 유치원 끊기
export const handlePostSchoolResigned = async () => {
  const url = `admin/teacher/school`;
  return await request<void>({
    url,
    method: "POST"
  });
};

//원장 탈퇴
export const handleDeleteOwner = async () => {
  const url = `admin/delete/owner`;
  return await request<void>({
    url,
    method: "POST"
  });
};

//선생님 탈퇴
export const handleDeleteTeacher = async (adminId: number) => {
  const url = `admin/delete/teacher`;
  return await request<void>({
    url,
    method: "POST",
    params: {
      adminId
    }
  });
};
