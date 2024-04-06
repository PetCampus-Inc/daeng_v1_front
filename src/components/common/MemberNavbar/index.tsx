import { MENU_ITEMS } from "constants/memberNavbar";

import usePathParams from "hooks/common/usePathParams";
import { memo } from "react";

import * as S from "./styles";

const MemberNavbar = () => {
  const path: string = usePathParams();

  return (
    <S.Container>
      {MENU_ITEMS.map((item) => (
        <S.NavButton key={item.text} to={item.path}>
          {path === item.path ? item.colorImage : item.blackImage}
          <S.Text className={path === item.path ? "active" : ""}>{item.text}</S.Text>
        </S.NavButton>
      ))}
    </S.Container>
  );
};

export default memo(MemberNavbar);
