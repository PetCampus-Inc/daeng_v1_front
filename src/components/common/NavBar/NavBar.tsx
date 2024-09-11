import { MENU_ITEMS } from "constants/navBar";
import { routes } from "constants/path";

import { memo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { dogIdState, dogProfileList } from "store/member";

import * as S from "./styles";

// FIXME: routes가 변경될 때 마다 매번 새로 그려지고 있습니다. 함수호출을 줄일 수 있는 방법을 찾아야합니다.
// MEMO: mypage 경우 url로 id를 넘겨주는 것보다 마이페이지에서 로컬스토리지에 저장된 memberId를 사용하는 게 좋을 것 같습니다.
const Navbar = () => {
  // FIXME 마이페이지에서 프로필 사진 등록 안 된 강아지 선택 후 홈으로 갈 경우 프로필 등록 페이지로 이동되는데 navbar 말고도 다른 방식이 있는지 알아보기
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
