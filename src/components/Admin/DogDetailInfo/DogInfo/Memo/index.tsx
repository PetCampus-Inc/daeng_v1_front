import PencilIcon from "assets/svg/pencil-icon";
import { InfoTop } from "../AboutDog/styles";
import { TextAreaInput } from "components/common/TextArea/styles";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import TextAreaModal from "components/common/TextAreaModal";
import { DogDetailInfoText } from "../styles";
import { FlexWrapper } from "../../styles";
import { useSubmitMemoMutation } from "hooks/api/useSubmitMemoMutation";
import showToast from "utils/showToast";

interface MemoProps {
  memo: string;
  id: number;
  refetch: () => void;
}

const Memo = ({ memo, id, refetch }: MemoProps) => {
  const methods = useForm({ mode: "onSubmit" });
  const mutatePostMemo = useSubmitMemoMutation();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    mutatePostMemo(
      { dogId: id, memo: methods.getValues("memoModal") },
      {
        onSuccess: () => {
          showToast("메모를 등록했습니다.", "bottom");
          refetch();
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
        value={methods.getValues("memoModal") ? methods.getValues("memoModal") : memo}
      />
      <AnimatePresence>
        {isOpen && (
          <FormProvider {...methods}>
            <TextAreaModal
              actionbutton="저장"
              closebutton="취소"
              closefunc={() => setIsOpen(false)}
              name="memoModal"
              register={methods.register}
              actionfunc={onSubmit}
              defaultValue={memo}
              placeholder="메모를 입력해주세요"
            />
          </FormProvider>
        )}
      </AnimatePresence>
    </FlexWrapper>
  );
};

export default Memo;