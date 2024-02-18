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
import ButtonModal from "components/common/ButtonModal";

type TicketTypeProps = {
  control: Control;
  name: string;
  ticketType: "ROUND" | "MONTHLY";
  defaultValues?: number[];
};

const TicketType = ({ control, name, ticketType, defaultValues = [] }: TicketTypeProps) => {
  const INIT_COUNTER = 2;
  const FIELD_NAME = name;
  const bottomSheet = useBottomSheet();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [counter, setCounter] = useState<number>(INIT_COUNTER);

  const { fields, append, remove } = useTicketFieldArray({
    control,
    fieldName: FIELD_NAME,
    defaultValues
  });

  const MAX_ITEMS = 6;
  const MIN_ITEMS = 1;
  const TICKET_TYPE = ticketType === "ROUND" ? "회차권" : "정기권";
  const TIMES = ticketType === "ROUND" ? "회" : "주";

  const handleAddRadio = () => {
    if (fields.length < MAX_ITEMS) {
      append({ value: counter });
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
      setIsDeleteModalOpen(true);
    }
  };

  const isDuplication = fields.some((field) => {
    const extendedField = field as ExtendedFieldArrayWithId;
    return extendedField.value === counter;
  });

  return (
    <>
      {isDeleteModalOpen && (
        <ButtonModal
          maintext="모두 삭제할 수 없어요"
          subtext={`최소 1개 이상의 ${TICKET_TYPE} 옵션을 추가해 주세요`}
          actionbutton="닫기"
          actionfunc={() => setIsDeleteModalOpen(false)}
        />
      )}
      {bottomSheet.isVisible && (
        <BottomSheet onClose={() => bottomSheet.close()}>
          <S.CloseButton type="button" onClick={() => bottomSheet.close()}>
            <XIcon />
          </S.CloseButton>
          <TicketCounter
            type={ticketType}
            isDuplication={isDuplication}
            initial={INIT_COUNTER}
            counter={counter}
            setCounter={setCounter}
          />
          <S.ConfirmButton onClick={handleAddRadio} disabled={isDuplication}>
            추가
          </S.ConfirmButton>
        </BottomSheet>
      )}
      <EditableRadioGroup
        control={control}
        suffix={TIMES}
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
        {TICKET_TYPE} 직접 추가
      </S.AddButton>
    </>
  );
};

export default TicketType;
