import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { Flex } from "components/common";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "../styles";

const RoleEdit = () => {
  const [currentRelation, setCurrentRelation] = useState<string>("");
  const [isShowRoles, setIsShowRoles] = useState(false);
  const { register, setValue, watch } = useFormContext();
  const notSelectedRelation = RELATION_DATA_ARR.filter((item) => item.relation !== currentRelation);

  const handleSelectedRelation = (relation: string) => {
    setCurrentRelation(RELATION_DATA[relation]);
    setValue("relation", relation);
    setIsShowRoles(false);
  };

  const handleShowRoles = () => {
    setIsShowRoles((prev) => !prev);
  };

  return (
    <S.RoleEditContainer>
      <S.RoleEditButton
        width="100%"
        height="49px"
        textcolor={currentRelation ? ThemeConfig.colors.gray_1 : ThemeConfig.colors.gray_3}
        backcolor={currentRelation ? ThemeConfig.colors.white : ThemeConfig.colors.gray_4}
        handleClick={handleShowRoles}
      >
        {currentRelation ? currentRelation : "호칭선택"}
      </S.RoleEditButton>

      {isShowRoles && (
        <S.RoleSelectWrapper direction="column">
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
        </S.RoleSelectWrapper>
      )}
    </S.RoleEditContainer>
  );
};

export default RoleEdit;
