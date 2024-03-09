import PencilIcon from "assets/svg/pencil-icon";
import TextArea from "components/common/TextArea";
import TextAreaModal from "components/common/TextAreaModal";
import { useSubmitMemoMutation } from "hooks/api/useSubmitMemoMutation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import showToast from "utils/showToast";

import { FlexWrapper } from "../../styles";
import { InfoTop } from "../AboutDog/styles";
import { DogDetailInfoText } from "../styles";

interface MemoProps {
  memo: string;
  id: number;
  refetch: () => void;
}

const Memo = ({ memo, id, refetch }: MemoProps) => {
  const methods = useForm({ mode: "onSubmit" });
  const mutatePostMemo = useSubmitMemoMutation();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = methods.handleSubmit(() => {
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
      <TextArea
        resizable={false}
        placeholder="메모를 입력해주세요"
        onClick={() => {
          setIsOpen(true);
        }}
        value={methods.getValues("memoModal") ? methods.getValues("memoModal") : memo}
        readOnly
      />
      <FormProvider {...methods}>
        <TextAreaModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          actionText="저장"
          closeText="취소"
          name="memoModal"
          register={methods.register}
          actionFn={onSubmit}
          defaultValue={memo}
          placeholder="메모를 입력해주세요"
        />
      </FormProvider>
    </FlexWrapper>
  );
};

export default Memo;
