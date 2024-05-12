import { MENU_ITEMS } from "constants/navBar";
import { PATH } from "constants/path";

import usePathParams from "hooks/common/usePathParams";
import React, { memo } from "react";
import { useLocation, useParams } from "react-router-dom";

import * as S from "./styles";

interface Props {
  type?: string;
  show?: string;
  attendance?: string;
}

// * typeof menuItem.path === 'function' -> path가 function인지에 따라 path 매개 변수 전달

// TODO: 로그인 시 원장/선생님 구분 데이터를 어떻게 저장하느냐에 따라 '유치원 운영' 노출 여부 변경하기
const Navbar = ({ type, show, attendance }: Props) => {
  const path: string = usePathParams();
  const location = useLocation();
  const memberId = 1; //임시 memberId

  const setIsPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <S.Container radius={`${path.includes("/admin") ? "0" : "20px 20px 0 0"}`}>
      {path.includes("/admin")
        ? MENU_ITEMS.admin.map((menuItem) => (
            <S.NavButton key={menuItem.text} to={menuItem.path}>
              {path === menuItem.path ? menuItem.colorImage : menuItem.blackImage}
              <S.Text className={path === menuItem.path ? "active" : ""}>{menuItem.text}</S.Text>
            </S.NavButton>
          ))
        : MENU_ITEMS.member.map((menuItem, index) => (
            <React.Fragment key={menuItem.text}>
              {typeof menuItem.path === "function" && (
                <S.NavButton to={menuItem.path(String(memberId))}>
                  {setIsPath(menuItem.path(String(memberId)))
                    ? menuItem.colorImage
                    : menuItem.blackImage}
                  <S.Text className={setIsPath(menuItem.path(String(memberId))) ? "active" : ""}>
                    {menuItem.text}
                  </S.Text>
                </S.NavButton>
              )}
              {typeof menuItem.path !== "function" && (
                <S.NavButton to={String(menuItem.path)}>
                  {setIsPath(String(menuItem.path)) ? menuItem.colorImage : menuItem.blackImage}
                  <S.Text className={setIsPath(String(menuItem.path)) ? "active" : ""}>
                    {menuItem.text}
                  </S.Text>
                </S.NavButton>
              )}
              {index === 0 && <S.Circle />}
            </React.Fragment>
          ))}
    </S.Container>
  );
};

export default memo(Navbar);
