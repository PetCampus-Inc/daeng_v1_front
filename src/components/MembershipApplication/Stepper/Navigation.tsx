import { useFormContext } from "react-hook-form";
import { getCaptions } from "libs/common/captions";

import * as S from "./styles";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Navigation = ({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) => {
  const { handleSubmit } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const captions = getCaptions(currentStep, stepsLength);

  const showPrevButton = (currentStep: number, stepsLength: number) => {
    return currentStep > 0 && currentStep < stepsLength - 1;
  };

  const showNextButton = (currentStep: number, stepsLength: number) => {
    return currentStep < stepsLength - 1;
  };

  return (
    <S.ButtonContainer>
      <S.Caption>
        {captions.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </S.Caption>
      <S.ButtonWrapper>
        {showPrevButton(currentStep, stepsLength) && (
          <S.PrevButton onClick={prevStep}>이전</S.PrevButton>
        )}
        {showNextButton(currentStep, stepsLength) && <S.Button onClick={nextStep}>다음</S.Button>}
        {currentStep === stepsLength - 1 && (
          <S.Button onClick={onSubmit} type="submit">
            제출하기
          </S.Button>
        )}
      </S.ButtonWrapper>
    </S.ButtonContainer>
  );
};

export default Navigation;
