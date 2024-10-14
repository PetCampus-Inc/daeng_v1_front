import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import {
  Indicator,
  Navigation,
  useAlertPopup,
  useFormHandlers
} from "components/Admin/EnrollmentForm";
import {
  DogInfo,
  MemberInfo,
  PickDropInfo,
  PolicyInfo,
  TicketInfo
} from "components/Admin/EnrollmentForm/CreateForm";
import * as Styled from "components/Admin/EnrollmentForm/styles";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import useStep from "hooks/common/useStep";
import { FieldValues, FormProvider, useForm, useFormState } from "react-hook-form";
import { useBlocker } from "react-router-dom";
import { isEmpty } from "utils/is";

interface EnrollmentFormCreateProps {
  formValues?: FieldValues;
  onNextStep: (formInfo: FieldValues) => void;
}

export default function EnrollmentFormCreatePage({
  formValues,
  onNextStep
}: EnrollmentFormCreateProps) {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: formValues,
    shouldFocusError: false, // 에러시 포커스 해제
    shouldUnregister: false
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, nextStep, prevStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  const openAlertPopup = useAlertPopup();
  const { onSubmit, onInvalid } = useFormHandlers(
    onNextStep,
    openAlertPopup,
    methods.setFocus,
    setStep
  );

  const { dirtyFields } = useFormState({ control: methods.control });
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const currentStep = new URLSearchParams(currentLocation.search).get("step");
    const nextStep = new URLSearchParams(nextLocation.search).get("step");

    if (
      (currentStep === "form" && nextStep === "submit") ||
      (currentStep === "submit" && nextStep === "form")
    )
      return false;

    return !isEmpty(dirtyFields);
  });

  return (
    <>
      {blocker.state === "blocked" ? (
        <PreventLeaveModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
      <Header type="text" text="가입신청서" />
      <Layout bgColor="BGray" px={16} pb={42}>
        <Styled.Container>
          <Styled.TopWrapper>
            <Styled.TitleWrapper>
              <Styled.Title>{currentTitle}</Styled.Title>
              <Styled.SubTitle>{currentSubtitle}</Styled.SubTitle>
            </Styled.TitleWrapper>
            <Indicator indicators={indicators} currentStep={currentStep} goToStep={setStep} />
          </Styled.TopWrapper>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
              <Styled.ContentWrapper>
                <Styled.Content $isVisible={currentStep === 0}>
                  <MemberInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 1}>
                  <DogInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 2}>
                  <TicketInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 3}>
                  <PolicyInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 4}>
                  <PickDropInfo />
                </Styled.Content>
              </Styled.ContentWrapper>
              <Styled.ButtonContainer>
                <Styled.HelperText>작성된 신청서로 견주가 가입 신청을 해요</Styled.HelperText>
                <Navigation
                  currentStep={currentStep}
                  stepsLength={currentSteps.length}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              </Styled.ButtonContainer>
            </form>
          </FormProvider>
        </Styled.Container>
      </Layout>
    </>
  );
}
