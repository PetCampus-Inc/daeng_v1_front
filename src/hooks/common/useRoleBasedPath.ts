import { PATH } from "constants/path";

import { useCallback } from "react";
import { Role } from "types/common/role.types";
import { isAdmin, isApproval, isMember } from "utils/is";

export const useRoleBasedPath = () => {
  return useCallback((role: Role) => {
    if (isAdmin(role)) return PATH.ADMIN_ATTENDANCE;
    else if (isMember(role)) return PATH.ROOT;
    else if (isApproval(role)) return PATH.APPROVAL_STATUS;
    else if (role === Role.ROLE_ANONYMOUS) return PATH.SIGNUP;
    else return PATH.LOGIN;
  }, []);
};
