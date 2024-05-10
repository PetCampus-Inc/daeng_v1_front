import { MEMBER_ENROLL_STEP } from "constants/step";

import { useGetEnrollment } from "hooks/api/member/enroll";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { schoolIdAtom } from "store/form";
import { PageContainer } from "styles/StyleModule";

import DogInfo from "./Form/DogInfo";
import MemberInfo from "./Form/MemberInfo";
import PickDropInfo from "./Form/PickDropInfo";
import PolicyInfo from "./Form/PolicyInfo";
import TicketInfo from "./Form/TicketInfo";
import Indicator from "./Stepper/Indicator";
import Navigation from "./Stepper/Navigation";
import * as S from "./styles";

// TODO: page 컴포넌트에서 조합해서 사용하기!
const EnrollmentForm = () => {
  const schoolId = useRecoilValue(schoolIdAtom) ?? -1;

  const { data } = useGetEnrollment({ memberId: "1", schoolId });
  const { requiredItemList, pickDropState, roundTicketNumber, monthlyTicketNumber, ...rest } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...rest }
  });

  const visibleSteps = MEMBER_ENROLL_STEP.filter((step) => step.isVisible(pickDropState));
  const maxSteps = visibleSteps.length;

  const { currentStep, nextStep, prevStep, setStep } = useStep(maxSteps - 1);

  const currentTitle = MEMBER_ENROLL_STEP[currentStep].title;
  const currentSubtitle = MEMBER_ENROLL_STEP[currentStep].subtitle;
  const indicators = visibleSteps.map((step) => step.indicator);

  const ticket = {
    roundTicketNumber,
    monthlyTicketNumber
  };

  return (
    <PageContainer color="BGray" pb="2.5">
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
              <MemberInfo requiredItems={requiredItemList} />
            </S.Content>
            <S.Content $isVisible={currentStep === 1}>
              <DogInfo requiredItems={requiredItemList} />
            </S.Content>
            <S.Content $isVisible={currentStep === 2}>
              <TicketInfo requiredItems={requiredItemList} ticket={ticket} />
            </S.Content>
            <S.Content $isVisible={currentStep === 3}>
              <PolicyInfo requiredItems={requiredItemList} />
            </S.Content>
            <S.Content $isVisible={currentStep === 4}>
              <PickDropInfo requiredItems={requiredItemList} />
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
    </PageContainer>
  );
};

export default EnrollmentForm;
