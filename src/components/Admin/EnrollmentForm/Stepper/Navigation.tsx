import { useState } from "react";
import ButtonModal from "components/common/ButtonModal";
import SubmitButton from "./SubmitButton";
import * as S from "./styles";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Navigation = ({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsLength - 1;

  return (
    <>
      {isModalOpen && (
        <ButtonModal
          maintext="가입신청서를 완성해 주세요"
          subtext="선택 입력으로 변경하거나 내용을 입력해 주세요"
          closebutton="닫기"
          actionbutton="돌아가기"
          closefunc={() => setIsModalOpen(false)}
          actionfunc={() => setIsModalOpen(false)}
        />
      )}
      <S.ButtonWrapper>
        {!isFirstStep && !isLastStep && <S.PrevButton onClick={prevStep}>이전</S.PrevButton>}
        {!isLastStep && <S.Button onClick={nextStep}>다음</S.Button>}
        {isLastStep && <SubmitButton setModal={setIsModalOpen} />}
      </S.ButtonWrapper>
    </>
  );
};

export default Navigation;
