import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import {
  MemberInfo,
  DogInfo,
  TicketInfo,
  PolicyInfo,
  PickDropInfo
} from "components/Admin/EnrollmentForm/EditForm";
import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import { NavigationButton } from "components/Admin/EnrollmentForm/Stepper/NavigationButton";
import {
  Container,
  TopWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  Content,
  ContentWrapper,
  ButtonContainer,
  HelperText
} from "components/Admin/EnrollmentForm/styles";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import { useAdminEnrollment } from "hooks/api/admin/enroll";
import useStep from "hooks/common/useStep";
import { FieldValues, FormProvider, useForm, useFormState } from "react-hook-form";
import { useBlocker, useParams } from "react-router-dom";
import { isEmpty } from "utils/is";

interface EnrollmentFormEditProps {
  formValues?: FieldValues;
  onNextStep?: (formInfo: FieldValues) => void;
}

export default function EnrollmentFormEditPage({
  formValues,
  onNextStep
}: EnrollmentFormEditProps) {
  const { formId } = useParams<{ formId: string }>();
  const { data } = useAdminEnrollment(Number(formId), "EDIT");

  const methods = useForm({
    mode: "onBlur",
    defaultValues: formValues ?? data,
    shouldFocusError: false,
    shouldUnregister: false // umount 시 값 유지
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  const { dirtyFields } = useFormState({ control: methods.control });

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const currentStep = new URLSearchParams(currentLocation.search).get("step");
    const nextStep = new URLSearchParams(nextLocation.search).get("step");

    if (
      (currentStep === "edit" && nextStep === "submit") ||
      (currentStep === "submit" && nextStep === "edit")
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
      <Header type="text" text="가입신청서 수정" />
      <Layout bgColor="BGray" px={16} pb={36}>
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
              <HelperText>변경된 내용으로 새로 저장 돼요</HelperText>
              <NavigationButton onNextStep={onNextStep} />
            </ButtonContainer>
          </FormProvider>
        </Container>
      </Layout>
    </>
  );
}
