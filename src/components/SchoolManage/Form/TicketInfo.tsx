import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import XIcon from "assets/svg/x-icon";
import BottomSheet from "components/common/BottomSheet";
import EditableRadioGroup from "components/common/Select/EditableRadioGroup";
import TicketCounter from "../TicketCounter";

import * as S from "./styles";

// FIXME: 실제 폼 형태로 수정 필요
const TicketInfo = () => {
  const initialCounter = 2;
  const { control, handleSubmit } = useForm();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [counter, setCounter] = useState<number>(initialCounter);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "myRadioGroup"
  });

  const handleAddRadio = () => {
    append({ value: counter.toString(), label: `${counter}회` });
    setBottomSheetVisible(false);
    setCounter(initialCounter);
  };

  return (
    <div>
      <button onClick={() => setBottomSheetVisible(true)}>직접 추가하기</button>
      {isBottomSheetVisible && (
        <BottomSheet onClose={() => setBottomSheetVisible(false)}>
          <S.CloseButton type="button" onClick={() => setBottomSheetVisible(false)}>
            <XIcon />
          </S.CloseButton>
          <TicketCounter initial={initialCounter} counter={counter} setCounter={setCounter} />
          <S.ConfirmButton onClick={handleAddRadio}>추가</S.ConfirmButton>
        </BottomSheet>
      )}
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <EditableRadioGroup control={control} name="myRadioGroup" fields={fields} remove={remove} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TicketInfo;
