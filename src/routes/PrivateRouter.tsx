import { routes } from "constants/path";

import { useRoleBasedPath } from "hooks/common/useRoleBasedPath";
import { useTokenHandler } from "hooks/common/useTokenHandler";
import { Navigate, Outlet } from "react-router-dom";
import { Role } from "types/common/role.types";

interface PrivateRouterProps {
  roles: Role[];
  redirectPath?: string;
}

export default function PrivateRouter({ roles, redirectPath }: PrivateRouterProps) {
  const { role } = useTokenHandler();
  const getRoleBasedPath = useRoleBasedPath();
  const basedPath = getRoleBasedPath(role);

  console.info({
    현재권한: role,
    접근가능권한: roles,
    접근경로: location.pathname,
    접근가능여부: roles.includes(role),
    리다이렉트경로: basedPath
  });
  return roles.includes(role) ? <Outlet /> : <Navigate to={redirectPath ?? routes.login.root} />;
}
