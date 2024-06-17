import { FIELD } from "constants/field";
import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";

interface RoleEditButtonProps {
  isShowRoles: boolean;
  handleShowRoles: () => void;
}

const RoleEditeButton = ({ isShowRoles, handleShowRoles }: RoleEditButtonProps) => {
  const { setValue, getValues } = useFormContext();

  const [currentRelation, setCurrentRelation] = useState<string>(
    RELATION_DATA[getValues(FIELD.RELATION)]
  );

  const notSelectedRelation = RELATION_DATA_ARR.filter((item) => item.relation !== currentRelation);

  const handleSelectedRelation = (relation: string) => {
    //TODO 버튼 클릭 시 호칭 영역 + 버튼 순서 변경
    setCurrentRelation(RELATION_DATA[relation]);
    setValue(FIELD.RELATION, relation, { shouldDirty: true });
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
