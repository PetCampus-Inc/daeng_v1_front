import { FIELD } from "constants/field";
import { RELATION_DATA } from "constants/relation";

import { useOverlay } from "hooks/common/useOverlay";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import RoleBottomSheet from "../BottomSheet/RoleBottomSheet";
import * as S from "../styles";

const RoleEdit = () => {
  const overlay = useOverlay();
  const { register, getValues } = useFormContext();
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
  };

  return (
    <S.RoleEditContainer>
      <S.RoleEditButton
        onClick={openRoleSelectPopup}
        color={currentRelation === "호칭선택" ? "gray_3" : "gray_1"}
        bg={currentRelation === "호칭선택" ? "gray_4" : "white"}
      >
        <span>{currentRelation}</span>
      </S.RoleEditButton>
    </S.RoleEditContainer>
  );
};

export default RoleEdit;
