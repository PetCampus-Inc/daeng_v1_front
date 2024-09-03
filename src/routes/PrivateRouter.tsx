import { PATH } from "constants/path";

import { useTokenHandler } from "hooks/common/useTokenHandler";
import { Navigate, Outlet } from "react-router-dom";
import { Role } from "types/common/role.types";

interface PrivateRouterProps {
  roles: Role[];
  redirectPath?: string;
}

export default function PrivateRouter({ roles, redirectPath = PATH.LOGIN }: PrivateRouterProps) {
  const { role } = useTokenHandler();
  console.log({
    현재권한: role,
    접근가능권한: roles,
    접근경로: location.pathname,
    접근가능여부: roles.includes(role)
  });
  return roles.includes(role) ? <Outlet /> : <Navigate to={redirectPath} />;
}
