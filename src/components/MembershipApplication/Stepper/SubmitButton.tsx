import { useFormContext, type FieldErrors } from "react-hook-form";
import { useEnrollMutation } from "hooks/api/useEnrollMutation";

import * as S from "./styles";
import { EnrollmentFormTransformer } from "utils/formTransformer";
import useBottomSheet from "hooks/common/useBottomSheet";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { FIELD_TO_STEP } from "constants/step";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";

const SubmitButton = () => {
  const { handleSubmit } = useFormContext();
  const setStep = useSetRecoilState(currentStepState);
  const enrollMutation = useEnrollMutation();
  const { isVisible, open, close } = useBottomSheet();

  const onSubmit = (data: object) => {
    // FIXME: schoolFormId, memberId, fileUrl 추가 필요
    const transformer = new EnrollmentFormTransformer(data);
    const requestData = transformer.transform();

    enrollMutation(requestData);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
    const firstErrorField = Object.keys(errors)[0];
    const step = FIELD_TO_STEP.get(firstErrorField);
    if (step !== undefined) {
      setStep(step);
    }
    open();
  };

  return (
    <>
      {isVisible && (
        <AlertBottomSheet
          onClose={close}
          title="입력을 하지 않은 필수 항목이 있어요"
          content="유의사항에 동의하지 않으면 가입이 어려워요"
          brownButton="확인"
          brownFuc={close}
        />
      )}
      <S.Button type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
        제출하기
      </S.Button>
    </>
  );
};

export default SubmitButton;
