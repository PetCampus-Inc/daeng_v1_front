import { FormProvider, useForm } from "react-hook-form";
import { useAdminEnrollQuery } from "hooks/api/useAdminEnrollQuery";
import useStep from "hooks/common/useStep";

import MemberInfo from "./Form/MemberInfo";
import DogInfo from "./Form/DogInfo";
import PolicyInfo from "./Form/PolicyInfo";
import PickDropInfo from "./Form/PickDropInfo";
import TicketInfo from "./Form/TicketInfo";
import Navigation from "./Stepper/Navigation";
import Indicator from "./Stepper/Indicator";
import SubmitButton from "./Stepper/SubmitButton";

import { FORM_DESC } from "constants/desc";
import { ADMIN_CREATE_FORM_STEP, ADMIN_READ_FORM_STEP } from "constants/step";
import * as S from "./styles";

interface EnrollmentFormProps {
  type: "READ" | "CREATE" | "EDIT";
}
// FIXME: CREATE | READ & EDIT 으로 분리 고려해볼 것.
const EnrollmentForm = ({ type }: EnrollmentFormProps) => {
  const { data } = useAdminEnrollQuery({ type, formId: "1" });
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
          {currentStep === 0 && <MemberInfo requiredItems={data?.requiredItemsMap} />}
          {currentStep === 1 && <DogInfo requiredItems={data?.requiredItemsMap} />}
          {currentStep === 2 && (
            <TicketInfo info={data?.ticketInfo} requiredItems={data?.requiredItemsMap} />
          )}
          {currentStep === 3 && (
            <PolicyInfo info={data?.policyInfo} requiredItems={data?.requiredItemsMap} />
          )}
          {currentStep === 4 && (
            <PickDropInfo info={data?.pickDropInfo} requiredItems={data?.requiredItemsMap} />
          )}
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
