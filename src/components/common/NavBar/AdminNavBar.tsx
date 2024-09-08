import { MENU_ITEMS } from "constants/navBar";
import { PATH } from "constants/path";

import usePathParams from "hooks/common/usePathParams";
import { useTokenHandler } from "hooks/common/useTokenHandler";
import { memo, useMemo } from "react";
import { AdminRole } from "types/common/role.types";

import * as S from "./styles";

// FIXME: routes가 변경될 때 마다 매번 새로 그려지고 있습니다. 함수호출을 줄일 수 있는 방법을 찾아야합니다.
const AdminNavbar = () => {
  const path: string = usePathParams();
  const { role } = useTokenHandler();

  const menuItems = useMemo(() => {
    if (!path.includes(PATH.ADMIN)) {
      return;
    }
    if (role === AdminRole.ROLE_TEACHER) {
      return MENU_ITEMS.admin.filter((item) => item.id !== 2);
    }
    return MENU_ITEMS.admin;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <S.NavList>
      {menuItems?.map((menuItem) => (
        <S.NavItem key={menuItem.text}>
          <S.NavLink to={menuItem.path} pb={18}>
            <S.SvgIcon size={role === AdminRole.ROLE_TEACHER ? 33 : 28}>
              {path === menuItem.path ? menuItem.colorImage : menuItem.blackImage}
            </S.SvgIcon>
            <S.Text className={path === menuItem.path ? "active" : ""}>{menuItem.text}</S.Text>
          </S.NavLink>
        </S.NavItem>
      ))}
    </S.NavList>
  );
};

export default memo(AdminNavbar);
