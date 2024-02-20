import { useState } from "react";

import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import SubmitButton from "./SubmitButton";
import * as S from "./styles";

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
      {isVisible && (
        <AlertBottomSheet
          onClose={close}
          title="입력을 하지 않은 필수 항목이 있어요"
          content="유의사항에 동의하지 않으면 가입이 어려워요"
          brownButton="확인"
          brownFuc={close}
        />
      )}
      <S.ButtonWrapper>
        {!isFirstStep && !isLastStep && <S.PrevButton onClick={prevStep}>이전</S.PrevButton>}
        {!isLastStep && <S.Button onClick={nextStep}>다음</S.Button>}
        {isLastStep && <SubmitButton setModal={setIsVisible} />}
      </S.ButtonWrapper>
    </>
  );
};

export default Navigation;
