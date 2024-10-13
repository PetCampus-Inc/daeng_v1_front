import { Flex, WideButton } from "components/common";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

export function Navigation({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsLength - 1;

  return (
    <Flex width="full" mt={4} mx={4} gap={4}>
      {/* {!isFirstStep && !isLastStep && (
        <WideButton onClick={prevStep} colorScheme="br_4" css={{ flex: 1 }}>
          이전
        </WideButton>
      )}
      {!isLastStep && (
        <WideButton onClick={nextStep} css={{ flex: 3 }}>
          다음
        </WideButton>
      )} */}
      <WideButton type="submit">가입 신청서 등록</WideButton>
    </Flex>
  );
}
