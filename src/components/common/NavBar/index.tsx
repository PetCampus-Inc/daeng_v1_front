import { MENU_ITEMS } from "constants/navBar";

import usePathParams from "hooks/common/usePathParams";
import React, { memo } from "react";

import * as S from "./styles";

interface Props {
  type?: string;
  show?: string;
  attendance?: string;
}

// TODO: 로그인 시 원장/선생님 구분 데이터를 어떻게 저장하느냐에 따라 '유치원 운영' 노출 여부 변경하기
const Navbar = ({ type, show, attendance }: Props) => {
  const path: string = usePathParams();

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
              <S.NavButton to={menuItem.path}>
                {path === menuItem.path ? menuItem.colorImage : menuItem.blackImage}
                <S.Text className={path === menuItem.path ? "active" : ""}>{menuItem.text}</S.Text>
              </S.NavButton>
              {index === 0 && <S.Circle />}
            </React.Fragment>
          ))}
    </S.Container>
  );
};

export default memo(Navbar);
