import { useFormContext } from "react-hook-form";
import { useEnrollMutation } from "hooks/api/useEnrollMutation";

import * as S from "./styles";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Navigation = ({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) => {
  const {
    handleSubmit,
    formState: { isValid }
  } = useFormContext();

  const enrollMutation = useEnrollMutation();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // enrollMutation(data);
  });

  const isLastStep = currentStep === stepsLength - 1;

  const showPrevButton = (currentStep: number, stepsLength: number) => {
    return currentStep > 0 && currentStep < stepsLength - 1;
  };

  const showNextButton = (currentStep: number, stepsLength: number) => {
    return currentStep < stepsLength - 1;
  };

  return (
    <S.ButtonContainer>
      <S.Caption>
        <p>정보를 모두 입력해야 가입신청이 가능합니다.</p>
        {isLastStep && <p>제출하신 후에는 수정이 불가하니, 꼼꼼히 확인해 주세요.</p>}
      </S.Caption>
      <S.ButtonWrapper>
        {showPrevButton(currentStep, stepsLength) && (
          <S.PrevButton onClick={prevStep}>이전</S.PrevButton>
        )}
        {showNextButton(currentStep, stepsLength) && <S.Button onClick={nextStep}>다음</S.Button>}
        {isLastStep && (
          <S.Button
            type="submit"
            onClick={onSubmit}
            aria-disabled={isValid ? "true" : undefined}
            aria-label="제출하기"
          >
            제출하기
          </S.Button>
        )}
      </S.ButtonWrapper>
    </S.ButtonContainer>
  );
};

export default Navigation;
