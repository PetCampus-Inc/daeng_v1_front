import { MEMBER_DOG_INFO_ENROLL_STEP, MEMBER_ENROLL_STEP } from "constants/step";

import DogInfo from "components/Enrollment/MemberForm/DogInfo";
import MemberInfo from "components/Enrollment/MemberForm/MemberInfo";
import PickDropInfo from "components/Enrollment/MemberForm/PickDropInfo";
import PolicyInfo from "components/Enrollment/MemberForm/PolicyInfo";
import TicketInfo from "components/Enrollment/MemberForm/TicketInfo";
import Indicator from "components/Enrollment/Stepper/Indicator";
import Navigation from "components/Enrollment/Stepper/Navigation";
import * as S from "components/Enrollment/styles";
import { useGetEnrollment } from "hooks/api/member/enroll";
import { useGetMemberDogEnrollmemntInfo } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import useStep from "hooks/common/useStep";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

interface EnrollmentProps {
  dogId?: number; // MEMO: 회원가입 과정 중에 제공하고 있음.
}

const EnrollmentDogDetail = ({ dogId }: EnrollmentProps) => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const { memberId } = useParams(); // MEMO: memberId (mypage에서 추출)

  const { data } = useGetMemberDogEnrollmemntInfo(Number(dogId));

  const { schoolFormResponse, ...rest } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...rest, ...schoolFormResponse }
  });

  const visibleSteps = MEMBER_DOG_INFO_ENROLL_STEP.filter((step) =>
    step.isVisible(data.pickDropRequest)
  );
  const maxSteps = visibleSteps.length;

  const { currentStep, nextStep, prevStep, setStep } = useStep(maxSteps - 1);

  const currentTitle = MEMBER_DOG_INFO_ENROLL_STEP[currentStep].title;
  const currentSubtitle = MEMBER_DOG_INFO_ENROLL_STEP[currentStep].subtitle;

  const indicators = visibleSteps.map((step) => step.indicator);

  const ticket = {
    roundTicketNumber: schoolFormResponse.roundTicketNumber,
    monthlyTicketNumber: schoolFormResponse.monthlyTicketNumber
  };

  // useEffect(() => {
  //   if (dogId) {
  //     nextStep;
  //   }
  // }, [dogId, nextStep, prevStep, setStep]);

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
              <MemberInfo requiredItems={schoolFormResponse.requiredItemList} />
            </S.Content>
            <S.Content $isVisible={currentStep === 1}>
              <DogInfo requiredItems={schoolFormResponse.requiredItemList} />
            </S.Content>
            <S.Content $isVisible={currentStep === 2}>
              <TicketInfo requiredItems={schoolFormResponse.requiredItemList} ticket={ticket} />
            </S.Content>
            <S.Content $isVisible={currentStep === 3}>
              <PolicyInfo requiredItems={schoolFormResponse.requiredItemList} />
            </S.Content>
            <S.Content $isVisible={currentStep === 4}>
              <PickDropInfo requiredItems={schoolFormResponse.requiredItemList} />
            </S.Content>
          </S.ContentWrapper>
        </FormProvider>
      </S.Container>
    </PageContainer>
  );
};

export default EnrollmentDogDetail;
