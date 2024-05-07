import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { useState } from "react";
import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";

interface IProps {
  isShowRoles: boolean;
  handleShowRoles: () => void;
  relationData: string;
}

console.log(RELATION_DATA_ARR);

const RoleEditeButton = ({ isShowRoles, handleShowRoles, relationData }: IProps) => {
  const [currentRelation, setCurrentRelation] = useState<string>(RELATION_DATA[relationData]);
  const notSelectedRelation = RELATION_DATA_ARR.filter((item) => item.relation !== currentRelation);

  const handleSelectedRelation = (relation: string) => {
    //TODO 버튼 클릭 시 호칭 영역 + 버튼 순서 변경
    setCurrentRelation(RELATION_DATA[relation]);
  };

  return (
    <>
      <S.RoleEditeButton
        width="100%"
        height="49px"
        textcolor={ThemeConfig.colors.gray_1}
        backcolor={ThemeConfig.colors.white}
        handleClick={handleShowRoles}
      >
        {currentRelation}
      </S.RoleEditeButton>
      {isShowRoles && (
        <>
          {notSelectedRelation.map((item, idx) => (
            <S.RoleSelectButton
              key={idx}
              width="100%"
              height="49px"
              textcolor={ThemeConfig.colors.gray_3}
              backcolor={ThemeConfig.colors.gray_4}
              handleClick={() => handleSelectedRelation(item.type)}
            >
              {item.relation}
            </S.RoleSelectButton>
          ))}
        </>
      )}
    </>
  );
};

export default RoleEditeButton;
