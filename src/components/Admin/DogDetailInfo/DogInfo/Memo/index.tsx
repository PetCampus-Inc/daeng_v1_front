import PencilIcon from "assets/svg/pencil-icon";
import { InfoTop } from "../AboutDog/styles";
import { TextAreaInput } from "components/common/TextArea/styles";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import TextAreaModal from "components/common/TextAreaModal";
import { DogDetailInfoText } from "../styles";
import { FlexWrapper } from "../../styles";
import { useSubmitMemoMutation } from "hooks/api/useSubmitMemoMutation";
import showToast from "utils/showToast";

interface MemoProps {
  memo: string;
  id: number;
}

const Memo = ({ memo, id }: MemoProps) => {
  const { getValues, register, handleSubmit } = useForm();
  const mutatePostMemo = useSubmitMemoMutation();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = handleSubmit((data) => {
    mutatePostMemo(
      { dogId: id, memo: getValues("memoModal") },
      {
        onSuccess: () => {
          showToast("메모를 등록했습니다.", "bottom");
        },
        onError: () => {
          showToast("메모 등록을 실패했습니다. 다시 시도해주세요", "bottom");
        }
      }
    );

    setIsOpen(false);
  });

  return (
    <FlexWrapper>
      <InfoTop>
        <DogDetailInfoText className="big">메모</DogDetailInfoText>
        <PencilIcon
          handleTouch={() => {
            setIsOpen(true);
          }}
        />
      </InfoTop>
      {/* FIXME: 나영이 작업 머지되면 수정하기 */}
      <TextAreaInput
        $isChecked={false}
        resizable={false}
        placeholder="메모를 입력해주세요"
        onClick={() => {
          setIsOpen(true);
        }}
        readOnly
        defaultValue={memo}
        value={getValues("memoModal")}
      />
      <AnimatePresence>
        {isOpen && (
          <TextAreaModal
            actionbutton="저장"
            closebutton="취소"
            closefunc={() => setIsOpen(false)}
            name="memoModal"
            register={register}
            actionfunc={onSubmit}
            defaultValue={memo}
            placeholder="메모를 입력해주세요"
          />
        )}
      </AnimatePresence>
    </FlexWrapper>
  );
};

export default Memo;
