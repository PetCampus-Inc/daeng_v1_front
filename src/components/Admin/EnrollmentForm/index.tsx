import { FormProvider, useForm } from "react-hook-form";
import useStep from "hooks/common/useStep";

import MemberInfo from "./Form/MemberInfo";
import DogInfo from "./Form/DogInfo";
import PolicyInfo from "./Form/PolicyInfo";
import PickDropInfo from "./Form/PickDropInfo";
import TicketInfo from "./Form/TicketInfo";
import Navigation from "./Stepper/Navigation";
import Indicator from "./Stepper/Indicator";

import * as S from "./styles";
import { ADMIN_CREATE_FORM_STEP, ADMIN_READ_FORM_STEP } from "constants/step";
import SubmitButton from "./Stepper/SubmitButton";
import { FORM_DESC } from "constants/desc";

interface EnrollmentFormProps {
  type: "READ" | "CREATE" | "EDIT";
}

const EnrollmentForm = ({ type }: EnrollmentFormProps) => {
  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false
  });

  const currentSteps = type === "READ" ? ADMIN_READ_FORM_STEP : ADMIN_CREATE_FORM_STEP;

  const { currentStep, nextStep, prevStep, setStep } = useStep(0, currentSteps.length - 1);

  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);
  const helperText = FORM_DESC[type as "CREATE" | "EDIT"]!;

  return (
    <S.Container>
      <S.TopWrapper>
        <S.TitleWrapper>
          <S.Title>{currentTitle}</S.Title>
          <S.SubTitle>{currentSubtitle}</S.SubTitle>
        </S.TitleWrapper>
        <Indicator indicators={indicators} currentStep={currentStep} goToStep={setStep} />
      </S.TopWrapper>
      <FormProvider {...methods}>
        <S.ContentWrapper>
          {currentStep === 0 && <MemberInfo />}
          {currentStep === 1 && <DogInfo />}
          {currentStep === 2 && <TicketInfo />}
          {currentStep === 3 && <PolicyInfo />}
          {currentStep === 4 && <PickDropInfo />}
        </S.ContentWrapper>
        {type !== "READ" && (
          <S.ButtonContainer>
            <S.Caption>{helperText}</S.Caption>
            {type === "CREATE" && (
              <Navigation
                currentStep={currentStep}
                stepsLength={currentSteps.length}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {type === "EDIT" && <SubmitButton type="EDIT" />}
          </S.ButtonContainer>
        )}
      </FormProvider>
    </S.Container>
  );
};

export default EnrollmentForm;
