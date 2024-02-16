import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAdminEnrollQuery } from "hooks/api/useAdminEnrollQuery";
import useStep from "hooks/common/useStep";

import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import MemberInfo from "components/Admin/EnrollmentForm/EditForm/MemberInfo";
import DogInfo from "components/Admin/EnrollmentForm/EditForm/DogInfo";
import TicketInfo from "components/Admin/EnrollmentForm/EditForm/TicketInfo";
import PolicyInfo from "components/Admin/EnrollmentForm/EditForm/PolicyInfo";
import PickDropInfo from "components/Admin/EnrollmentForm/EditForm/PickDropInfo";
import SubmitButton from "components/Admin/EnrollmentForm/Stepper/SubmitButton";

import { PATH } from "constants/path";
import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import {
  Container,
  TopWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  ContentWrapper,
  ButtonContainer,
  HelperText
} from "components/Admin/EnrollmentForm/styles";

const EnrollmentFormEditPage = () => {
  const { formId } = useParams();
  if (!formId) throw new Error("잘못된 formId 입니다");

  const { data } = useAdminEnrollQuery(formId);
  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, setStep } = useStep(0, currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  return (
    <>
      <Header type="main" />
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
          </ContentWrapper>
          <ButtonContainer>
            <HelperText>변경된 내용으로 새로 저장 돼요</HelperText>
            <SubmitButton type="EDIT" />
          </ButtonContainer>
        </FormProvider>
      </Container>
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default EnrollmentFormEditPage;
