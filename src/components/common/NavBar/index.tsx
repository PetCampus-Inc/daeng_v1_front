import { MENU_ITEMS } from "constants/navBar";
import { PATH } from "constants/path";

import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import usePathParams from "hooks/common/usePathParams";
import { Fragment, memo, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "routes/AuthProvider";
import { AUTH_MEMBER_ID } from "store/auth";
import { Role } from "types/admin/admin.types";

import * as S from "./styles";

// FIXME: admin nav 와 member nav 구분이 필요합니다.
// FIXME: routes가 변경될 때 마다 매번 새로 그려지고 있습니다. 함수호출을 줄일 수 있는 방법을 찾아야합니다.
const Navbar = () => {
  const path: string = usePathParams();
  const location = useLocation();
  const memberId = useLocalStorageValue<string>(AUTH_MEMBER_ID);
  const adminContext = useAuth();

  const isCurrentPath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  const getFilteredMenuItems = useMemo(() => {
    if (!path.includes(PATH.ADMIN)) {
      return;
    }
    if (adminContext?.auth?.role === Role.ROLE_TEACHER) {
      return MENU_ITEMS.admin.filter((item) => item.text !== "유치원 운영");
    }
    return MENU_ITEMS.admin;
  }, [adminContext?.auth?.role]);

  return (
    <S.Container radius={`${path.includes(PATH.ADMIN) ? "0" : "20px 20px 0 0"}`}>
      {path.includes(PATH.ADMIN)
        ? getFilteredMenuItems?.map((menuItem) => (
            <S.NavButton key={menuItem.text} to={menuItem.path}>
              {path === menuItem.path ? menuItem.colorImage : menuItem.blackImage}
              <S.Text className={path === menuItem.path ? "active" : ""}>{menuItem.text}</S.Text>
            </S.NavButton>
          ))
        : MENU_ITEMS.member.map((menuItem, index) => (
            <Fragment key={menuItem.text}>
              {menuItem.text === "마이페이지" ? (
                <S.NavButton to={menuItem.path(String(memberId))}>
                  {isCurrentPath(menuItem.path(String(memberId)))
                    ? menuItem.colorImage
                    : menuItem.blackImage}
                  <S.Text
                    className={isCurrentPath(menuItem.path(String(memberId))) ? "active" : ""}
                  >
                    {menuItem.text}
                  </S.Text>
                </S.NavButton>
              ) : (
                <S.NavButton to={menuItem.path}>
                  {isCurrentPath(menuItem.path) ? menuItem.colorImage : menuItem.blackImage}
                  <S.Text className={isCurrentPath(menuItem.path) ? "active" : ""}>
                    {menuItem.text}
                  </S.Text>
                </S.NavButton>
              )}
              {index === 0 && <S.Circle />}
            </Fragment>
          ))}
    </S.Container>
  );
};

export default memo(Navbar);
