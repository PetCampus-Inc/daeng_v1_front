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
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { useAdminEnrollQuery } from "hooks/api/useAdminEnrollQuery";
import useStep from "hooks/common/useStep";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const EnrollmentFormEditPage = () => {
  const { formId } = useParams();
  if (!formId) throw new Error("잘못된 formId 입니다");

  const { data, isLoading } = useAdminEnrollQuery(formId, "EDIT");

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: data
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header type="text" text="가입신청서 수정" />
      <PageContainer color="BGray">
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
              <SubmitButton type="EDIT" />
            </ButtonContainer>
          </FormProvider>
        </Container>
      </PageContainer>
      <NavBar type="admin" />
    </>
  );
};

export default EnrollmentFormEditPage;
