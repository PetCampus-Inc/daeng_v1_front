import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import DogInfo from "components/Admin/EnrollmentForm/CreateForm/DogInfo";
import MemberInfo from "components/Admin/EnrollmentForm/CreateForm/MemberInfo";
import PickDropInfo from "components/Admin/EnrollmentForm/CreateForm/PickDropInfo";
import PolicyInfo from "components/Admin/EnrollmentForm/CreateForm/PolicyInfo";
import TicketInfo from "components/Admin/EnrollmentForm/CreateForm/TicketInfo";
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
import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import { useOverlay } from "hooks/common/useOverlay";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";

interface EnrollmentFormCreateProps {
  onNextStep?: (formInfo: AdminEnrollmentInfoType) => void;
}

const EnrollmentFormCreatePage = ({ onNextStep }: EnrollmentFormCreateProps) => {
  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      ticketType: []
    }
  });
  const navigate = useNavigate();
  const overlay = useOverlay();

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, nextStep, prevStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal isOpen={isOpen} close={close} action={() => navigate(-1)} />
    ));

  return (
    <>
      <Header type="text" text="가입신청서" handleClick={openPreventLeavePopup} />
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
};

export default EnrollmentFormCreatePage;
