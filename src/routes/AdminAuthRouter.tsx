import { PATH } from "constants/path";

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminRole } from "types/common/role.types";

import { AuthContext } from "./AuthProvider";

type Props = {
  isOwnerOnly?: boolean;
};

const AdminAuthRouter = ({ isOwnerOnly = false }: Props) => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthProvider를 찾을 수 없습니다.");

  // 로그인 유무 판단
  if (!authContext.isLoggedIn) {
    console.log("로그인 안되어 있음!");
    return <Navigate replace to={PATH.ADMIN_LOGIN} />;
  }

  // 관리자 권한 판단
  const role = authContext.auth?.role;

  // owner 권한이 필요한 경우
  if (isOwnerOnly) {
    if (role === AdminRole.ROLE_OWNER) {
      return <Outlet />;
    } else {
      return <Navigate replace to={PATH.ADMIN_ATTENDANCE} />;
    }
  }

  // teacher 또는 owner 권한이 필요한 경우
  if (role === AdminRole.ROLE_TEACHER || role === AdminRole.ROLE_OWNER) {
    return <Outlet />;
  }

  // 권한이 없는 경우
  console.log("권한없음");
  return <Navigate replace to={PATH.ADMIN_LOGIN} />;
};

export default AdminAuthRouter;
