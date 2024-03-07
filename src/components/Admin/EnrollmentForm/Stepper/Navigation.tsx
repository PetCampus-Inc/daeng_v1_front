import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useState } from "react";

import * as S from "./styles";
import SubmitButton from "./SubmitButton";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Navigation = ({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsLength - 1;
  const [isVisible, setIsVisible] = useState(false);
  const close = () => setIsVisible(false);

  return (
    <>
      <AlertBottomSheet
        isOpen={isVisible}
        onClose={close}
        title="입력을 하지 않은 필수 항목이 있어요"
        subtitle="유의사항에 동의하지 않으면 가입이 어려워요"
        actionText="확인"
        actionFn={close}
      />
      <S.ButtonWrapper>
        {!isFirstStep && !isLastStep && <S.PrevButton onClick={prevStep}>이전</S.PrevButton>}
        {!isLastStep && <S.Button onClick={nextStep}>다음</S.Button>}
        {isLastStep && <SubmitButton setModal={setIsVisible} />}
      </S.ButtonWrapper>
    </>
  );
};

export default Navigation;
