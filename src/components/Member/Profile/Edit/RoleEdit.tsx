import { FIELD } from "constants/field";
import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "../styles";

const RoleEdit = () => {
  const [currentRelation, setCurrentRelation] = useState<string>("");
  const [isShowRoles, setIsShowRoles] = useState(false);
  const { setValue } = useFormContext();
  const notSelectedRelation = RELATION_DATA_ARR.filter((item) => item.relation !== currentRelation);

  const handleSelectedRelation = (relation: string) => {
    setCurrentRelation(RELATION_DATA[relation]);
    setValue(FIELD.RELATION, relation);
    setIsShowRoles(false);
  };

  const handleShowRoles = () => {
    setIsShowRoles((prev) => !prev);
  };

  return (
    <S.RoleEditContainer>
      <S.RoleEditButton
        width="112"
        height="49"
        typo="body2_16_R"
        color={currentRelation ? "gray_1" : "gray_3"}
        bg={currentRelation ? "white" : "gray_4"}
        onClick={handleShowRoles}
      >
        {currentRelation ? currentRelation : "호칭선택"}
      </S.RoleEditButton>

      {isShowRoles && (
        <S.RoleSelectWrapper direction="column">
          {notSelectedRelation.map((item, idx) => (
            <S.RoleSelectButton
              key={idx}
              width="112"
              height="49"
              typo="body2_16_R"
              color="gray_3"
              bg="gray_4"
              onClick={() => handleSelectedRelation(item.type)}
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