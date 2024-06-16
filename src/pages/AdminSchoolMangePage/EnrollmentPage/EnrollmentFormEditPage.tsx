import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import DogInfo from "components/Admin/EnrollmentForm/EditForm/DogInfo";
import MemberInfo from "components/Admin/EnrollmentForm/EditForm/MemberInfo";
import PickDropInfo from "components/Admin/EnrollmentForm/EditForm/PickDropInfo";
import PolicyInfo from "components/Admin/EnrollmentForm/EditForm/PolicyInfo";
import TicketInfo from "components/Admin/EnrollmentForm/EditForm/TicketInfo";
import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import SubmitButton from "components/Admin/EnrollmentForm/Stepper/SubmitButton";
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
import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import { useAdminEnrollment } from "hooks/api/admin/enroll";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useBlocker, useParams } from "react-router-dom";

import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";

interface EnrollmentFormEditProps {
  onNextStep?: (formInfo: AdminEnrollmentInfoType) => void;
}

const EnrollmentFormEditPage = ({ onNextStep }: EnrollmentFormEditProps) => {
  const { formId } = useParams();

  if (!formId) throw new Error("잘못된 formId 입니다");

  const { data } = useAdminEnrollment(formId, "EDIT");

  const methods = useForm({
    mode: "onBlur",
    defaultValues: data,
    shouldFocusError: false
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  const blocker = useBlocker(() => methods.formState.isDirty);

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
      <Layout type="page" bg="BGray">
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
              <SubmitButton type="EDIT" onNextStep={onNextStep} />
            </ButtonContainer>
          </FormProvider>
        </Container>
      </Layout>
    </>
  );
};

export default EnrollmentFormEditPage;
