import { useState } from "react";
import type { Control } from "react-hook-form";
import useTicketFieldArray from "hooks/common/useTicketFieldArray";
import useBottomSheet from "hooks/common/useBottomSheet";

import XIcon from "assets/svg/x-icon";
import EditableRadioGroup from "components/common/Select/EditableRadioGroup";
import TicketCounter from "../TicketCounter";
import BottomSheet from "components/common/BottomSheet";

import * as S from "../Form/styles";

type TicketTypeProps = {
  control: Control;
};

const MonthlyTicketType = ({ control }: TicketTypeProps) => {
  const INIT_COUNTER = 2;
  const FIELD_NAME = "MonthlyTicketType";
  const bottomSheet = useBottomSheet();
  const [counter, setCounter] = useState<number>(INIT_COUNTER);
  // FIXME: 임의 값으로 수정 필요
  const defaultValues = [1, 2, 3, 4];

  const { fields, append, remove } = useTicketFieldArray({
    control,
    fieldName: FIELD_NAME,
    defaultValues
  });

  const handleAddRadio = () => {
    append({ value: counter.toString(), label: `${counter}주` });
    bottomSheet.close();
    setCounter(INIT_COUNTER);
  };

  return (
    <>
      {bottomSheet.isVisible && (
        <BottomSheet onClose={() => bottomSheet.close()}>
          <S.CloseButton type="button" onClick={() => bottomSheet.close()}>
            <XIcon />
          </S.CloseButton>
          <TicketCounter
            type="MONTHLY"
            initial={INIT_COUNTER}
            counter={counter}
            setCounter={setCounter}
          />
          <S.ConfirmButton onClick={handleAddRadio}>추가</S.ConfirmButton>
        </BottomSheet>
      )}
      <button onClick={() => bottomSheet.open()}>직접 추가하기</button>
      <EditableRadioGroup control={control} name={FIELD_NAME} fields={fields} remove={remove} />
    </>
  );
};

export default MonthlyTicketType;
