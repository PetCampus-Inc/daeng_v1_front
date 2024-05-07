import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";

interface IProps {
  isShowRoles: boolean;
  handleShowRoles: () => void;
  relationData: string;
}

console.log(RELATION_DATA_ARR);

const RoleEditeButton = ({ isShowRoles, handleShowRoles, relationData }: IProps) => {
  const notSelectedRelation = RELATION_DATA_ARR.filter((item) => item.type !== relationData);

  const handleSelectedRelation = (relation: string) => {
    //TODO 버튼 클릭 시 호칭 영역 + 버튼 순서 변경
    console.log(relation);
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
        {RELATION_DATA[relationData]}
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
