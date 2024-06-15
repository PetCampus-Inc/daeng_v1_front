import { MENU_ITEMS } from "constants/navBar";
import { PATH } from "constants/path";

import usePathParams from "hooks/common/usePathParams";
import { memo, useMemo } from "react";
import { useAuth } from "routes/AuthProvider";
import { Role } from "types/admin/admin.types";

import * as S from "./styles";

// FIXME: routes가 변경될 때 마다 매번 새로 그려지고 있습니다. 함수호출을 줄일 수 있는 방법을 찾아야합니다.
const AdminNavbar = () => {
  const path: string = usePathParams();
  const adminContext = useAuth();

  const getFilteredMenuItems = useMemo(() => {
    if (!path.includes(PATH.ADMIN)) {
      return;
    }
    if (adminContext?.auth?.role === Role.ROLE_TEACHER) {
      return MENU_ITEMS.admin.filter((item) => item.text !== "유치원 운영");
    }
    return MENU_ITEMS.admin;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminContext?.auth?.role]);

  return (
    <S.Container radius={"0"}>
      {getFilteredMenuItems?.map((menuItem) => (
        <S.NavButton key={menuItem.text} to={menuItem.path}>
          {path === menuItem.path ? menuItem.colorImage : menuItem.blackImage}
          <S.Text className={path === menuItem.path ? "active" : ""}>{menuItem.text}</S.Text>
        </S.NavButton>
      ))}
    </S.Container>
  );
};

export default memo(AdminNavbar);
