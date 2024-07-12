import { AUTH_KEY } from "store/auth";

import { useLocalStorageValue } from "./useLocalStorage";

import type { AdminAuthType } from "types/admin/admin.types";
import type { Nullable } from "types/helper.types";

export const useAdminInfo = (): AdminAuthType => {
  const auth = useLocalStorageValue<Nullable<AdminAuthType>>(AUTH_KEY, null);

  if (!auth) throw new Error("로그인 정보가 없습니다!");
  // FIXME: 1) access token 디코딩해서 정보 가져오기 2) 에러바운더리로 던져서 login 페이지로 이동

  const { adminId, adminName, schoolId, role, schoolName } = auth;
  return { adminId, adminName, schoolId, role, schoolName };
};
