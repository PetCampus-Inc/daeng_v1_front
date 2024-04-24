import * as S from "./styles";

interface MenuToggleProps {
  selectedTab: string;
}
const MenuToggle = ({ selectedTab }: MenuToggleProps) => {
  return <S.Container>{selectedTab}</S.Container>;
};

export default MenuToggle;
