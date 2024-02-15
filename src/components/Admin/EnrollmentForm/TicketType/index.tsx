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

import type { TTicketType } from "types/School.type";
import AddIcon from "assets/svg/addIcon";
import * as S from "./styles";

type TicketTypeProps = {
  type: TTicketType;
  control: Control;
  name: string;
  defaultValues: number[];
};

const TicketType = ({ control, name, type, defaultValues }: TicketTypeProps) => {
  const INIT_COUNTER = 2;
  const bottomSheet = useBottomSheet();
  const [counter, setCounter] = useState(INIT_COUNTER);
  const { fields, append, remove } = useTicketFieldArray({
    control,
    fieldName: name,
    defaultValues
  });

  const MAX_ITEMS = 6;
  const MIN_ITEMS = 1;
  const times = type === "ROUND" ? "회" : "주";

  const handleAdd = () => {
    if (fields.length < MAX_ITEMS) {
      append({ value: counter.toString(), label: counter + times });
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
          <S.CloseButton onClick={() => bottomSheet.close()}>
            <XIcon />
          </S.CloseButton>
          <TicketCounter
            type={type}
            isDuplication={isDuplication}
            initial={INIT_COUNTER}
            counter={counter}
            setCounter={setCounter}
          />
          <S.ConfirmButton
            onClick={handleAdd}
            disabled={isDuplication || fields.length >= MAX_ITEMS}
          >
            추가
          </S.ConfirmButton>
        </BottomSheet>
      )}
      <EditableRadioGroup control={control} name={name} fields={fields} remove={handleRemove} />
      <S.AddButton onClick={() => bottomSheet.open()} disabled={fields.length >= MAX_ITEMS}>
        <AddIcon /> {type === "ROUND" ? "회차권" : "정기권"} 직접 추가
      </S.AddButton>
    </>
  );
};

export default TicketType;
