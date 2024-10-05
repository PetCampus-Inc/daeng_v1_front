import { FIELD } from "constants/field";
import { RELATION_DATA } from "constants/relation";

import { useOverlay } from "hooks/common/useOverlay";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import RoleBottomSheet from "../BottomSheet/RoleBottomSheet";
import * as S from "../styles";

const RoleEdit = () => {
  const overlay = useOverlay();
  const { register, setValue, getValues } = useFormContext();
  const [currentRelation, setCurrentRelation] = useState<string>(getValues(FIELD.RELATION));

  const openRoleSelectPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <RoleBottomSheet
        isOpen={isOpen}
        close={close}
        actionFn={handleSelectedRelation}
        register={register}
        title="호칭선택"
      />
    ));

  const handleSelectedRelation = (relation: string) => {
    setCurrentRelation(RELATION_DATA[relation]);
    setValue(FIELD.RELATION, relation, { shouldValidate: true });
  };

  return (
    <S.RoleEditContainer>
      <S.RoleEditButton
        onClick={openRoleSelectPopup}
        color={currentRelation ? "gray_1" : "gray_3"}
        bg={currentRelation ? "white" : "gray_4"}
      >
        <span>{currentRelation ? currentRelation : "호칭선택"}</span>
      </S.RoleEditButton>
    </S.RoleEditContainer>
  );
};

export default RoleEdit;
