import { PATH } from "constants/path";

import { useTokenHandler } from "hooks/common/useTokenHandler";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "types/common/role.types";
import { isAdmin, isApproval, isMember } from "utils/is";

// useEffect로 처리하는 게 나을 지 고민 됨
export const useRoleBasedNavigate = () => {
  const navigate = useNavigate();
  const { role } = useTokenHandler();

  return useCallback(() => {
    if (isAdmin(role)) {
      navigate(PATH.ADMIN_ATTENDANCE, { replace: true });
    } else if (isMember(role)) {
      navigate(PATH.ROOT, { replace: true });
    } else if (isApproval(role)) {
      navigate(PATH.APPROVAL_STATUS, { replace: true });
    } else if (role === Role.ROLE_ANONYMOUS) {
      navigate(PATH.SIGNUP, { replace: true });
    }
  }, [role, navigate]);
};
