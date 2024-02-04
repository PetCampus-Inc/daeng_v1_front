import * as S from "./styles";

interface StepNavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const StepNavigation = ({ currentStep, stepsLength, nextStep, prevStep }: StepNavigationProps) => {
  let captions;
  if (currentStep === stepsLength - 1) {
    captions = [
      "정보를 모두 입력해야 가입신청이 가능합니다.",
      "제출하신 후에는 수정이 불가하니, 꼼꼼히 확인해 주세요."
    ];
  } else {
    captions = ["정보를 모두 입력해야 가입신청이 가능합니다."];
  }

  return (
    <S.ButtonContainer>
      <S.Caption>
        {captions.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </S.Caption>
      <S.ButtonWrapper>
        {currentStep > 0 && currentStep < stepsLength - 1 && (
          <S.PrevButton onClick={prevStep}>이전</S.PrevButton>
        )}
        {currentStep < stepsLength - 1 && <S.Button onClick={nextStep}>다음</S.Button>}
        {currentStep === stepsLength - 1 && <S.Button type="submit">제출하기</S.Button>}
      </S.ButtonWrapper>
    </S.ButtonContainer>
  );
};

export default StepNavigation;
