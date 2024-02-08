import { FormProvider, useForm } from "react-hook-form";
import { useEnrollQuery } from "hooks/api/useEnrollQuery";
import useStep from "hooks/common/useStep";

import MemberInfo from "./Form/MemberInfo";
import DogInfo from "./Form/DogInfo";
import PolicyInfo from "./Form/PolicyInfo";
import PickDropInfo from "./Form/PickDropInfo";
import TicketInfo from "./Form/TicketInfo";
import Navigation from "./Stepper/Navigation";
import Indicator from "./Stepper/Indicator";
import { MEMBER_MA_STEP } from "constants/step";

import * as S from "./styles";

const MembershipApplication = () => {
  const { enlistmentQuery } = useEnrollQuery({ memberId: "1", schoolId: "1" });
  const { requiredItemsMap, pickDropInfo, policyInfo, ticketInfo } = enlistmentQuery.data;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false
  });
  const { currentStep, nextStep, prevStep, setStep } = useStep(0, MEMBER_MA_STEP.length - 1);

  const currentTitle = MEMBER_MA_STEP[currentStep].title;
  const currentSubtitle = MEMBER_MA_STEP[currentStep].subtitle;
  const indicators: string[] = MEMBER_MA_STEP.map((s) => s.indicator);

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
          {currentStep === 0 && <MemberInfo requiredItems={requiredItemsMap} />}
          {currentStep === 1 && <DogInfo requiredItems={requiredItemsMap} />}
          {currentStep === 2 && <TicketInfo info={ticketInfo} requiredItems={requiredItemsMap} />}
          {currentStep === 3 && <PolicyInfo info={policyInfo} requiredItems={requiredItemsMap} />}
          {currentStep === 4 && (
            <PickDropInfo info={pickDropInfo} requiredItems={requiredItemsMap} />
          )}
        </S.ContentWrapper>
        <Navigation
          currentStep={currentStep}
          stepsLength={MEMBER_MA_STEP.length}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </FormProvider>
    </S.Container>
  );
};

export default MembershipApplication;
