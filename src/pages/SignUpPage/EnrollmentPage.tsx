import { MEMBER_DOG_ADD_ENROLL_STEP, MEMBER_ENROLL_STEP } from "constants/step";

import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import DogInfo from "components/Enrollment/Form/DogInfo";
import MemberInfo from "components/Enrollment/Form/MemberInfo";
import PickDropInfo from "components/Enrollment/Form/PickDropInfo";
import PolicyInfo from "components/Enrollment/Form/PolicyInfo";
import TicketInfo from "components/Enrollment/Form/TicketInfo";
import MemberDogInfo from "components/Enrollment/MemberDogInfoForm/DogInfo";
import Indicator from "components/Enrollment/Stepper/Indicator";
import Navigation from "components/Enrollment/Stepper/Navigation";
import * as S from "components/Enrollment/styles";
import { useGetEnrollment } from "hooks/api/member/enroll";
import { useOverlay } from "hooks/common/useOverlay";
import useStep from "hooks/common/useStep";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

interface EnrollmentProps {
  schoolId?: number; // MEMO: 회원가입 과정 중에 제공하고 있음.
  isMemberAddDog?: boolean; // MEMO: 마이페이지에서 강아지 추가할 경우
}

const EnrollmentPage = ({ schoolId, isMemberAddDog }: EnrollmentProps) => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const { memberId } = useParams(); // MEMO: memberId (mypage에서 추출)
  const MEMBERID = isMemberAddDog && memberId ? memberId : "1";

  const { data } = useGetEnrollment({ memberId: MEMBERID, schoolId: schoolId ?? -1 });
  const { requiredItemList, pickDropState, roundTicketNumber, monthlyTicketNumber, ...rest } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...rest }
  });

  const visibleSteps = (isMemberAddDog ? MEMBER_DOG_ADD_ENROLL_STEP : MEMBER_ENROLL_STEP).filter(
    (step) => step.isVisible(pickDropState)
  );
  const maxSteps = visibleSteps.length;

  const { currentStep, nextStep, prevStep, setStep } = useStep(maxSteps - 1);

  const currentTitle = isMemberAddDog
    ? MEMBER_DOG_ADD_ENROLL_STEP[currentStep].title
    : MEMBER_ENROLL_STEP[currentStep].title;

  const currentSubtitle = isMemberAddDog
    ? MEMBER_DOG_ADD_ENROLL_STEP[currentStep].subtitle
    : MEMBER_ENROLL_STEP[currentStep].subtitle;

  const indicators = visibleSteps.map((step) => step.indicator);

  console.log(indicators);

  const ticket = {
    roundTicketNumber,
    monthlyTicketNumber
  };

  // TODO: browser history stack 관리 필요..!
  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal isOpen={isOpen} close={close} action={() => navigate(-1)} />
    ));

  // useEffect(() => {
  //   if (isMemberAddDog) {
  //     nextStep;
  //   }
  // }, [isMemberAddDog, nextStep, prevStep, setStep]);

  return (
    <>
      <Header
        type="text"
        text="가입신청서"
        handleClick={() => {
          openPreventLeavePopup();
        }}
      />
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
              {!isMemberAddDog && (
                <S.Content $isVisible={currentStep === 0}>
                  <MemberInfo requiredItems={requiredItemList} />
                </S.Content>
              )}
              <S.Content $isVisible={currentStep === (isMemberAddDog ? 0 : 1)}>
                {isMemberAddDog ? (
                  <MemberDogInfo requiredItems={requiredItemList} />
                ) : (
                  <DogInfo requiredItems={requiredItemList} />
                )}
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
    </>
  );
};

export default EnrollmentPage;
