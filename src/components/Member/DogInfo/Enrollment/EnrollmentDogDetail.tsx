import { MEMBER_DOG_INFO_ENROLL_STEP } from "constants/step";

import { Layout } from "components/common";
import Header from "components/common/Header";
import DogInfo from "components/Enrollment/MemberDogReadForm/DogInfo";
import MemberInfo from "components/Enrollment/MemberDogReadForm/MemberInfo";
import PickDropInfo from "components/Enrollment/MemberDogReadForm/PickDropInfo";
import PolicyInfo from "components/Enrollment/MemberDogReadForm/PolicyInfo";
import TicketInfo from "components/Enrollment/MemberDogReadForm/TicketInfo";
import Indicator from "components/Enrollment/Stepper/Indicator";
import * as S from "components/Enrollment/styles";
import { useGetMemberDogEnrollmentInfo } from "hooks/api/member/member";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";

interface EnrollmentProps {
  dogId?: number; // MEMO: 강아지 상세 정보에서 제공
}

const EnrollmentDogDetail = ({ dogId }: EnrollmentProps) => {
  const { data } = useGetMemberDogEnrollmentInfo(Number(dogId));
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

  const { currentStep, setStep } = useStep(maxSteps - 1);

  const currentTitle = MEMBER_DOG_INFO_ENROLL_STEP[currentStep].title;
  const currentSubtitle = MEMBER_DOG_INFO_ENROLL_STEP[currentStep].subtitle;

  const indicators = visibleSteps.map((step) => step.indicator);

  const ticket = {
    roundTicketNumber: schoolFormResponse.roundTicketNumber,
    monthlyTicketNumber: schoolFormResponse.monthlyTicketNumber
  };

  return (
    <>
      <Header type="text" text={`${data.dogName}의 가입신청서`} />
      <Layout bgColor="BGray" px={16} pb={40}>
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
                <MemberInfo />
              </S.Content>
              <S.Content $isVisible={currentStep === 1}>
                <DogInfo />
              </S.Content>
              <S.Content $isVisible={currentStep === 2}>
                <TicketInfo ticket={ticket} />
              </S.Content>
              <S.Content $isVisible={currentStep === 3}>
                <PolicyInfo />
              </S.Content>
              <S.Content $isVisible={currentStep === 4}>
                <PickDropInfo />
              </S.Content>
            </S.ContentWrapper>
          </FormProvider>
        </S.Container>
      </Layout>
    </>
  );
};

export default EnrollmentDogDetail;
