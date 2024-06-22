import { FIELD } from "constants/field";
import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

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
      <S.RoleEditButton color="gray_1" bg="white" onClick={handleShowRoles}>
        {currentRelation}
      </S.RoleEditButton>
      {isShowRoles && (
        <>
          {notSelectedRelation.map((item, idx) => (
            <S.RoleEditButton
              key={idx}
              color="gray_3"
              bg="gray_4"
              onClick={() => handleSelectedRelation(item.type)}
            >
              {item.relation}
            </S.RoleEditButton>
          ))}
        </>
      )}
    </>
  );
};

export default RoleEditeButton;
