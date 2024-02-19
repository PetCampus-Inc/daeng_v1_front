import { useState } from "react";
import SubmitButton from "./SubmitButton";
import * as S from "./styles";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";

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
      <S.ButtonContainer>
        <S.Caption>
          <p>정보를 모두 입력해야 가입신청이 가능합니다.</p>
          {isLastStep && <p>제출하신 후에는 수정이 불가하니, 꼼꼼히 확인해 주세요.</p>}
        </S.Caption>
        <S.ButtonWrapper>
          {!isFirstStep && !isLastStep && <S.PrevButton onClick={prevStep}>이전</S.PrevButton>}
          {!isLastStep && <S.Button onClick={nextStep}>다음</S.Button>}
          {isLastStep && <SubmitButton setIsVisible={setIsVisible} />}
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </>
  );
};

export default Navigation;
