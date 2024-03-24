import { FIELD_TO_STEP } from "constants/step";

import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useEnrollMutation } from "hooks/api/useEnrollMutation";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { EnrollmentFormTransformer } from "utils/formTransformer";

import * as S from "./styles";

const SubmitButton = () => {
  const { handleSubmit } = useFormContext();
  const enrollMutation = useEnrollMutation();
  const overlay = useOverlay();

  const setStep = useSetRecoilState(currentStepState);

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={close}
        title="입력을 하지 않은 필수 항목이 있어요"
        subtitle="유의사항에 동의하지 않으면 가입이 어려워요"
        actionText="확인"
        actionFn={close}
      />
    ));

  const onSubmit = (data: object) => {
    // FIXME: schoolFormId, memberId, fileUrl 추가 필요
    const transformer = new EnrollmentFormTransformer(data);
    const requestData = transformer.transform();

    enrollMutation(requestData);
  };

  const onInvalid = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0];
    const step = FIELD_TO_STEP.get(firstErrorField);
    if (step !== undefined) {
      setStep(step);
      openPopup();
    }
  };

  return (
    <S.Button type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      제출하기
    </S.Button>
  );
};

export default SubmitButton;
