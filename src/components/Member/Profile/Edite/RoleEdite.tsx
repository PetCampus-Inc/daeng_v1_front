import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { Flex } from "components/common";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { themeConfig } from "styles/themeConfig";

import * as S from "../styles";

const RoleEdite = () => {
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
    <S.RoleEditeContainer>
      <S.RoleEditeButton
        width="100%"
        height="49px"
        textcolor={currentRelation ? themeConfig.colors.gray_1 : themeConfig.colors.gray_3}
        backcolor={currentRelation ? themeConfig.colors.white : themeConfig.colors.gray_4}
        handleClick={handleShowRoles}
      >
        {currentRelation ? currentRelation : "호칭선택"}
      </S.RoleEditeButton>

      {isShowRoles && (
        <S.RoleSelectWrapper direction="column">
          {notSelectedRelation.map((item, idx) => (
            <S.RoleSelectButton
              key={idx}
              width="100%"
              height="49px"
              textcolor={themeConfig.colors.gray_3}
              backcolor={themeConfig.colors.gray_4}
              handleClick={() => handleSelectedRelation(item.type)}
            >
              {item.relation}
            </S.RoleSelectButton>
          ))}
        </S.RoleSelectWrapper>
      )}
    </S.RoleEditeContainer>
  );
};

export default RoleEdite;
