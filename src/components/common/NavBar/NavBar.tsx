import { MENU_ITEMS } from "constants/navBar";
import { routes } from "constants/path";

import { memo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { dogIdState, dogProfileList } from "store/member";

import * as S from "./styles";

const Navbar = () => {
  // 마이페이지에서 프로필 없는 강아지 선택 후 홈 선택할 경우 프로필 등록 페이지 이동합니다.
  // FIXME 효율적인 다른 방식이 있는지 좀 더 알아보겠습니다!
  const dogProfile = useRecoilValue(dogProfileList);
  const selectedDogId = useRecoilValue(dogIdState);

  const notfoundDogProfile = dogProfile.find(
    (dog) => String(dog.dogId) === String(selectedDogId) && !dog.dogProfile
  );

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
            <S.NavLink
              to={
                // 프로필이 없는 강아지 선택할 경우
                menuItem.text === "홈" && notfoundDogProfile
                  ? routes.member.profile.dog.root
                  : menuItem.path
              }
              pb={13}
            >
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
