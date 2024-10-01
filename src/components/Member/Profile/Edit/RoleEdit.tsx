import { FIELD } from "constants/field";
import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "../styles";

const RoleEdit = () => {
  const { register, setValue, getValues } = useFormContext();
  const relation = getValues(FIELD.RELATION);
  const [currentRelation, setCurrentRelation] = useState<string>(relation);
  const [isShowRoles, setIsShowRoles] = useState(false);
  const notSelectedRelation = RELATION_DATA_ARR.filter((item) => item.relation !== currentRelation);

  const handleSelectedRelation = (relation: string) => {
    setCurrentRelation(RELATION_DATA[relation]);
    setValue(FIELD.RELATION, relation, { shouldValidate: true });
    setIsShowRoles(false);
  };

  const handleShowRoles = () => {
    setIsShowRoles((prev) => !prev);
  };

  return (
    <S.RoleEditContainer>
      <S.RoleEditButton
        onClick={handleShowRoles}
        color={currentRelation ? "gray_1" : "gray_3"}
        bg={currentRelation ? "white" : "gray_4"}
      >
        <span>{currentRelation ? currentRelation : "호칭선택"}</span>
      </S.RoleEditButton>

      <S.RoleEditInput
        id="roleEdit"
        value={currentRelation ? currentRelation : ""}
        {...register(FIELD.RELATION, {
          required: true,
          validate: (value) => value !== "호칭선택"
        })}
      />

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
