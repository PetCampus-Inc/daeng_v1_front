import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import {
  DogInfo,
  MemberInfo,
  PickDropInfo,
  PolicyInfo,
  TicketInfo
} from "components/Admin/EnrollmentForm/CreateForm";
import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import Navigation from "components/Admin/EnrollmentForm/Stepper/Navigation";
import {
  Container,
  TopWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  ContentWrapper,
  Content,
  ButtonContainer,
  HelperText
} from "components/Admin/EnrollmentForm/styles";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import useStep from "hooks/common/useStep";
import { FieldValues, FormProvider, useForm, useFormState } from "react-hook-form";
import { useBlocker } from "react-router-dom";
import { isEmpty } from "utils/is";

interface EnrollmentFormCreateProps {
  formValues?: FieldValues;
  onNextStep?: (formInfo: FieldValues) => void;
}

export default function EnrollmentFormCreatePage({
  formValues,
  onNextStep
}: EnrollmentFormCreateProps) {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: formValues,
    shouldUnregister: false
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, nextStep, prevStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

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
      <Layout bg="BGray" px={16}>
        <Container>
          <TopWrapper>
            <TitleWrapper>
              <Title>{currentTitle}</Title>
              <SubTitle>{currentSubtitle}</SubTitle>
            </TitleWrapper>
            <Indicator indicators={indicators} currentStep={currentStep} goToStep={setStep} />
          </TopWrapper>
          <FormProvider {...methods}>
            <ContentWrapper>
              <Content $isVisible={currentStep === 0}>
                <MemberInfo />
              </Content>
              <Content $isVisible={currentStep === 1}>
                <DogInfo />
              </Content>
              <Content $isVisible={currentStep === 2}>
                <TicketInfo />
              </Content>
              <Content $isVisible={currentStep === 3}>
                <PolicyInfo />
              </Content>
              <Content $isVisible={currentStep === 4}>
                <PickDropInfo />
              </Content>
            </ContentWrapper>
            <ButtonContainer>
              <HelperText>작성된 신청서로 견주가 가입 신청을 해요</HelperText>
              <Navigation
                currentStep={currentStep}
                stepsLength={currentSteps.length}
                nextStep={nextStep}
                prevStep={prevStep}
                onNextStep={onNextStep}
              />
            </ButtonContainer>
          </FormProvider>
        </Container>
      </Layout>
    </>
  );
}
