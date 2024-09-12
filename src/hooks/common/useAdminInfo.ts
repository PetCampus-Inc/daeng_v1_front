import { useRecoilValue } from "recoil";
import { adminInfoState } from "store/admin";

import type { AdminAuthType } from "types/admin/admin.types";

export const useAdminInfo = (): AdminAuthType => {
  const auth = useRecoilValue(adminInfoState);

  if (!auth) throw new Error("로그인 정보가 없습니다!");
  // FIXME: 1) access token 디코딩해서 정보 가져오기 2) 에러바운더리로 던져서 login 페이지로 이동

  const { adminName, schoolId, schoolName } = auth;
  return { adminName, schoolId, schoolName };
};
