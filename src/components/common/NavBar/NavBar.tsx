import { MENU_ITEMS } from "constants/navBar";

import { memo, useCallback } from "react";

import * as S from "./styles";

const Navbar = () => {
  const isCurrentPath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  return (
    <S.NavList radius={"20px 20px 0 0"}>
      {MENU_ITEMS.member.map((menuItem) => (
        <S.NavItem key={menuItem.text}>
          {menuItem.text === "마이페이지" ? (
            <S.NavLink to={menuItem.path} pb={13}>
              <S.SvgIcon size={33}>
                {isCurrentPath(menuItem.path) ? menuItem.colorImage : menuItem.blackImage}
              </S.SvgIcon>
              <S.Text className={isCurrentPath(menuItem.path) ? "active" : ""}>
                {menuItem.text}
              </S.Text>
            </S.NavLink>
          ) : (
            <S.NavLink to={menuItem.path} pb={13}>
              <S.SvgIcon size={33}>
                {isCurrentPath(menuItem.path) ? menuItem.colorImage : menuItem.blackImage}
              </S.SvgIcon>
              <S.Text className={isCurrentPath(menuItem.path) ? "active" : ""}>
                {menuItem.text}
              </S.Text>
            </S.NavLink>
          )}
          {menuItem.id === 0 && <S.Circle />}
        </S.NavItem>
      ))}
    </S.NavList>
  );
};

export default memo(Navbar);
