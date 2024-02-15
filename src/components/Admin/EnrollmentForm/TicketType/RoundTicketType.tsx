import { useState } from "react";
import type { Control } from "react-hook-form";
import useTicketFieldArray from "hooks/common/useTicketFieldArray";
import useBottomSheet from "hooks/common/useBottomSheet";

import XIcon from "assets/svg/x-icon";
import EditableRadioGroup, {
  ExtendedFieldArrayWithId
} from "components/common/Select/EditableRadioGroup";
import TicketCounter from "../TicketCounter";
import BottomSheet from "components/common/BottomSheet";

import * as S from "./styles";
import AddIcon from "assets/svg/addIcon";

type TicketTypeProps = {
  control: Control;
  name: string;
};

const RoundTicketType = ({ control, name }: TicketTypeProps) => {
  const INIT_COUNTER = 2;
  const FIELD_NAME = name;
  const bottomSheet = useBottomSheet();
  const [counter, setCounter] = useState<number>(INIT_COUNTER);
  const defaultValues = [1, 3, 5, 10];

  const { fields, append, remove } = useTicketFieldArray({
    control,
    fieldName: FIELD_NAME,
    defaultValues
  });

  const MAX_ITEMS = 6;
  const MIN_ITEMS = 1;

  const handleAddRoundRadio = () => {
    if (fields.length < MAX_ITEMS) {
      append({ value: counter.toString(), label: `${counter}회` });
      bottomSheet.close();
      setCounter(INIT_COUNTER);
    } else {
      alert("더 이상 추가할 수 없습니다.");
    }
  };

  const handleRemove = (index: number) => {
    if (fields.length > MIN_ITEMS) {
      remove(index);
    } else {
      alert("최소 1개 이상의 항목이 필요합니다.");
    }
  };

  const isDuplication = fields.some((field) => {
    const extendedField = field as ExtendedFieldArrayWithId;
    return extendedField.value === counter.toString();
  });

  return (
    <>
      {bottomSheet.isVisible && (
        <BottomSheet onClose={() => bottomSheet.close()}>
          <S.CloseButton type="button" onClick={() => bottomSheet.close()}>
            <XIcon />
          </S.CloseButton>
          <TicketCounter
            type="ROUND"
            isDuplication={isDuplication}
            initial={INIT_COUNTER}
            counter={counter}
            setCounter={setCounter}
          />
          <S.ConfirmButton onClick={handleAddRoundRadio} disabled={isDuplication}>
            추가
          </S.ConfirmButton>
        </BottomSheet>
      )}
      <EditableRadioGroup
        control={control}
        name={FIELD_NAME}
        fields={fields}
        remove={handleRemove}
      />
      <S.AddButton
        type="button"
        onClick={() => bottomSheet.open()}
        disabled={fields.length >= MAX_ITEMS}
      >
        <AddIcon />
        회차권 직접 추가
      </S.AddButton>
    </>
  );
};

export default RoundTicketType;
