import { FIELD } from "constants/field";
import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import RoleBottomSheet from "components/Member/Profile/BottomSheet/RoleBottomSheet";
import { useOverlay } from "hooks/common/useOverlay";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "./styles";

const RoleEditButton = () => {
  const overlay = useOverlay();
  const { register, getValues } = useFormContext();
  const [currentRelation, setCurrentRelation] = useState<string>(
    RELATION_DATA[getValues(FIELD.RELATION)]
  );

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
    <>
      <S.RoleEditButton color="gray_1" bg="white" onClick={openRoleSelectPopup}>
        {currentRelation}
      </S.RoleEditButton>
    </>
  );
};

export default RoleEditButton;
