import { useRecoilValue } from "recoil";
import { adminInfoState } from "store/admin";

import type { TAdminLoginInfo } from "types/admin/admin.type";
import type { Nullable } from "types/helper.type";

function isAdminLoginInfo(data: Nullable<TAdminLoginInfo>): data is TAdminLoginInfo {
  return data !== null;
}

export const useAdminInfo = (): TAdminLoginInfo => {
  const adminInfo = useRecoilValue(adminInfoState);

  if (!isAdminLoginInfo(adminInfo)) throw new Error("Admin login info is not valid");

  const { adminId, adminName, schoolId, role, schoolName } = adminInfo;
  return { adminId, adminName, schoolId, role, schoolName };
};
