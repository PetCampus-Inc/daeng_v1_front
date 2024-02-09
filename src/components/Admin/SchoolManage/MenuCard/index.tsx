import NewSignUpIcon from "assets/svg/new-sign-up-icon";
import * as S from "./styles";
import TeacherManagementIcon from "assets/svg/teacher-management-icon";
import { useState } from "react";

const MenuCard = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleTouch = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const menuCardItems = [
    { text: "신규가입", icon: <NewSignUpIcon /> },
    { text: "선생님 관리", icon: <TeacherManagementIcon /> }
  ];

  return (
    <S.CardContainer>
      {menuCardItems.map((menuItem, index) => (
        <S.Card
          onClick={() => handleTouch(index)}
          key={menuItem.text}
          className={index === activeIndex ? "active" : ""}
        >
          {menuItem.text}
          <S.IconWrapper>{menuItem.icon}</S.IconWrapper>
        </S.Card>
      ))}
    </S.CardContainer>
  );
};

export default MenuCard;
