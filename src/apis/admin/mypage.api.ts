import { request } from "libs/AuthAxios/request";
import { IOwnerProfileEdit } from "types/admin/admin.types";

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

/** 원장 프로필 수정 */
export const handleOwnerProfileEdit = async (req: IOwnerProfileEdit) => {
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
