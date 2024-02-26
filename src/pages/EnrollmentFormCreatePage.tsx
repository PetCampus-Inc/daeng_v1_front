import { FormProvider, useForm } from "react-hook-form";
import useStep from "hooks/common/useStep";

import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import MemberInfo from "components/Admin/EnrollmentForm/CreateForm/MemberInfo";
import DogInfo from "components/Admin/EnrollmentForm/CreateForm/DogInfo";
import TicketInfo from "components/Admin/EnrollmentForm/CreateForm/TicketInfo";
import PolicyInfo from "components/Admin/EnrollmentForm/CreateForm/PolicyInfo";
import PickDropInfo from "components/Admin/EnrollmentForm/CreateForm/PickDropInfo";
import Navigation from "components/Admin/EnrollmentForm/Stepper/Navigation";
import Header from "components/common/Header";

import { ADMIN_CREATE_FORM_STEP } from "constants/step";

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
import { ContentContainer } from "styles/StyleModule";

const EnrollmentFormCreatePage = () => {
  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      ticketType: []
    }
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, nextStep, prevStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  return (
    <>
      <Header type="text" text="가입신청서 수정" />
      <ContentContainer>
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
              />
            </ButtonContainer>
          </FormProvider>
        </Container>
      </ContentContainer>
    </>
  );
};

export default EnrollmentFormCreatePage;
