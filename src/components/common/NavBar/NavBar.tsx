import { MENU_ITEMS } from "constants/navBar";

import { useOverlay } from "hooks/common/useOverlay";
import { memo, useCallback } from "react";

import * as S from "./styles";
import AlertBottomSheet from "../BottomSheet/AlertBottomSheet";

const Navbar = () => {
  const isCurrentPath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  // **채팅 기능 활성화 되면 삭제
  const overlay = useOverlay();
  const openAlertPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={() => {
          close();
        }}
        title="곧 출시 예정인 기능이에요"
        subtitle="채팅 기능이 곧 출시됩니다"
        actionText="닫기"
        actionFn={() => {
          close();
        }}
      />
    ));

  return (
    <S.NavList radius={"20px 20px 0 0"}>
      {MENU_ITEMS.member.map((menuItem) => (
        <S.NavItem key={menuItem.text}>
          {menuItem.text === "채팅" ? (
            <S.NavButton onClick={() => openAlertPopup()} pb={13}>
              <S.SvgIcon size={33}>
                {isCurrentPath(menuItem.path) ? menuItem.colorImage : menuItem.blackImage}
              </S.SvgIcon>
              <S.Text className={isCurrentPath(menuItem.path) ? "active" : ""}>
                {menuItem.text}
              </S.Text>
            </S.NavButton>
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
