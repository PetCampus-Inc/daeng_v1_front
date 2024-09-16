import { routes } from "constants/path";

import { useCallback } from "react";
import { Role } from "types/common/role.types";
import { isAdmin, isApproval, isMember } from "utils/is";

export const useRoleBasedPath = () => {
  return useCallback((role: Role) => {
    if (role == Role.APPROVAL_CANCEL || role == Role.WITHDRAWN)
      return routes.admin.signup.rejoin.root;
    else if (role === Role.ROLE_ANONYMOUS) return routes.signup.root;
    else if (isAdmin(role)) return routes.admin.attendance.root;
    else if (isMember(role)) return routes.root;
    else if (isApproval(role)) return routes.approval.root;
    else return routes.login.root;
  }, []);
};
