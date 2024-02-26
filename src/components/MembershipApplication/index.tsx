import { FormProvider, useForm } from "react-hook-form";
import { useEnrollQuery } from "hooks/api/useEnrollQuery";
import useStep from "hooks/common/useStep";

import Header from "components/common/Header";
import MemberInfo from "./Form/MemberInfo";
import DogInfo from "./Form/DogInfo";
import PolicyInfo from "./Form/PolicyInfo";
import PickDropInfo from "./Form/PickDropInfo";
import TicketInfo from "./Form/TicketInfo";
import Navigation from "./Stepper/Navigation";
import Indicator from "./Stepper/Indicator";
import { MEMBER_MA_STEP } from "constants/step";

import * as S from "./styles";
import { ContentContainer } from "styles/StyleModule";

const MembershipApplication = () => {
  const { enlistmentQuery } = useEnrollQuery({ memberId: "1", schoolId: "2" });
  const { requiredItemsMap, pickDropInfo, policyInfo, ticketInfo } = enlistmentQuery.data;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false
  });

  const visibleSteps = MEMBER_MA_STEP.filter((step) => step.isVisible(pickDropInfo));
  const maxSteps = visibleSteps.length;

  const { currentStep, nextStep, prevStep, setStep } = useStep(maxSteps - 1);

  const currentTitle = MEMBER_MA_STEP[currentStep].title;
  const currentSubtitle = MEMBER_MA_STEP[currentStep].subtitle;
  const indicators = visibleSteps.map((step) => step.indicator);
  return (
    <>
      <Header type="text" text="가입신청서" />
      <ContentContainer>
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
              <S.Content $isVisible={currentStep === 0}>
                <MemberInfo requiredItems={requiredItemsMap} />
              </S.Content>
              <S.Content $isVisible={currentStep === 1}>
                <DogInfo requiredItems={requiredItemsMap} />
              </S.Content>
              <S.Content $isVisible={currentStep === 2}>
                <TicketInfo info={ticketInfo} requiredItems={requiredItemsMap} />
              </S.Content>
              <S.Content $isVisible={currentStep === 3}>
                <PolicyInfo info={policyInfo} requiredItems={requiredItemsMap} />
              </S.Content>
              <S.Content $isVisible={currentStep === 4}>
                <PickDropInfo info={pickDropInfo} requiredItems={requiredItemsMap} />
              </S.Content>
            </S.ContentWrapper>
            <Navigation
              currentStep={currentStep}
              stepsLength={maxSteps}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </FormProvider>
        </S.Container>
      </ContentContainer>
    </>
  );
};

export default MembershipApplication;
