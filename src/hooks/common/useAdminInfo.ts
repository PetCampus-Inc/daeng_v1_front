import { isEqual } from "lodash"; // lodash 라이브러리 사용
import { useRecoilValue } from "recoil";
import { adminInfoState, defaultAdminProfile } from "store/admin";

import type { AdminProfile } from "types/admin/admin.types";

export const useAdminInfo = (): AdminProfile => {
  const adminInfo = useRecoilValue(adminInfoState);

  if (isEqual(adminInfo, defaultAdminProfile)) throw new Error("로그인 정보가 없습니다!");
  return adminInfo;
};
