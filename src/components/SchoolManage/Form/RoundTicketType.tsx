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

const RoundTicketType = ({ control }: TicketTypeProps) => {
  const INIT_COUNTER = 2;
  const FIELD_NAME = "RoundTicketType";
  const bottomSheet = useBottomSheet();
  const [counter, setCounter] = useState<number>(INIT_COUNTER);
  const defaultValues = [1, 3, 5, 10];

  const { fields, append, remove } = useTicketFieldArray({
    control,
    fieldName: FIELD_NAME,
    defaultValues
  });

  const handleAddRoundRadio = () => {
    append({ value: counter.toString(), label: `${counter}회` });
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
            type="ROUND"
            initial={INIT_COUNTER}
            counter={counter}
            setCounter={setCounter}
          />
          <S.ConfirmButton onClick={handleAddRoundRadio}>추가</S.ConfirmButton>
        </BottomSheet>
      )}
      <button onClick={() => bottomSheet.open()}>직접 추가하기</button>
      <EditableRadioGroup control={control} name={FIELD_NAME} fields={fields} remove={remove} />
    </>
  );
};

export default RoundTicketType;
