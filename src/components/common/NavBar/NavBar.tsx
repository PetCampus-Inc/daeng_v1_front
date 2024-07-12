import { MENU_ITEMS } from "constants/navBar";

import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { Fragment, memo, useCallback } from "react";
import { AUTH_MEMBER_ID } from "store/auth";

import * as S from "./styles";

// FIXME: routes가 변경될 때 마다 매번 새로 그려지고 있습니다. 함수호출을 줄일 수 있는 방법을 찾아야합니다.
const Navbar = () => {
  const memberId = useLocalStorageValue<string>(AUTH_MEMBER_ID);

  const isCurrentPath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  return (
    <S.Container radius={"20px 20px 0 0"}>
      {MENU_ITEMS.member.map((menuItem, index) => (
        <Fragment key={menuItem.text}>
          {menuItem.text === "마이페이지" ? (
            <S.NavButton to={menuItem.path(String(memberId))}>
              {isCurrentPath(menuItem.path(String(memberId)))
                ? menuItem.colorImage
                : menuItem.blackImage}
              <S.Text className={isCurrentPath(menuItem.path(String(memberId))) ? "active" : ""}>
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
