import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { useFormContext } from "react-hook-form";

import * as S from "./styles";
import SubmitButton from "./SubmitButton";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Navigation = ({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) => {
  const { setFocus } = useFormContext();
  const overlay = useOverlay();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsLength - 1;

  const openInvalidInputPopup = (field: string) =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={() => {
          close();
          setFocus(field);
        }}
        title="입력을 하지 않은 필수 항목이 있어요"
        subtitle="유의사항에 동의하지 않으면 가입이 어려워요"
        actionText="확인"
        actionFn={() => {
          close();
          setFocus(field);
        }}
      />
    ));

  return (
    <S.ButtonContainer>
      <S.Caption>
        <p>정보를 모두 입력해야 가입신청이 가능합니다.</p>
        {isLastStep && <p>제출하신 후에는 수정이 불가하니, 꼼꼼히 확인해 주세요.</p>}
      </S.Caption>
      <S.ButtonWrapper>
        {!isFirstStep && !isLastStep && <S.PrevButton onClick={prevStep}>이전</S.PrevButton>}
        {!isLastStep && <S.Button onClick={nextStep}>다음</S.Button>}
        {isLastStep && <SubmitButton openPopup={openInvalidInputPopup} />}
      </S.ButtonWrapper>
    </S.ButtonContainer>
  );
};

export default Navigation;
