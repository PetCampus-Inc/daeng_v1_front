import { memo } from "react";
import usePathParams from "hooks/common/usePathParams";
import { MENU_ITEMS } from "constants/navBar";
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
    <S.Container>
      {MENU_ITEMS.map((menuItem) => (
        <S.NavButton key={menuItem.text} to={menuItem.path}>
          {path === menuItem.path ? menuItem.colorImage : menuItem.blackImage}
          <S.Text className={path === menuItem.path ? "active" : ""}>{menuItem.text}</S.Text>
        </S.NavButton>
      ))}
    </S.Container>
  );
};

export default memo(Navbar);
