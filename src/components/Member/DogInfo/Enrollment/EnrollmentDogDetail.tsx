import { MEMBER_DOG_INFO_ENROLL_STEP } from "constants/step";

import {
  DogInfo,
  MemberInfo,
  PickDropInfo,
  PolicyInfo,
  TicketInfo
} from "components/Admin/EnrollmentForm/DetailForm";
import { Layout } from "components/common";
import Header from "components/common/Header";
import Indicator from "components/Enrollment/Stepper/Indicator";
import * as S from "components/Enrollment/styles";
import { useGetMemberDogEnrollmentInfo } from "hooks/api/member/member";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

/**
 * 강아지 가입신청서 보기
 */
const EnrollmentDogDetail = () => {
  const { enrollmentFormId } = useParams<{ enrollmentFormId: string }>();

  const { data } = useGetMemberDogEnrollmentInfo(Number(enrollmentFormId));

  const { requiredItemList, agreements, ...rest } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: rest
  });

  const visibleSteps = MEMBER_DOG_INFO_ENROLL_STEP.filter((step) =>
    step.isVisible(data.schoolFormResponse.pickDropState)
  );
  const maxSteps = visibleSteps.length;
  const { currentStep, setStep } = useStep(maxSteps - 1);
  const currentTitle = MEMBER_DOG_INFO_ENROLL_STEP[currentStep].title;
  const currentSubtitle = MEMBER_DOG_INFO_ENROLL_STEP[currentStep].subtitle;
  const indicators = visibleSteps.map((step) => step.indicator);

  const ticketInfo = {
    ticketType: rest.enrollmentTicketType,
    roundTicketNumber: rest.roundTicketNumber,
    monthlyTicketNumber: rest.monthlyTicketNumber,
    enrollmentRoundTicketNumber: rest.enrollmentRoundTicketNumber,
    enrollmentMonthlyTicketNumber: rest.enrollmentMonthlyTicketNumber,
    openDays: rest.openDays,
    attendanceDays: rest.attendanceDays
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
              {currentStep === 0 && <MemberInfo item={requiredItemList} />}
              {currentStep === 1 && <DogInfo item={requiredItemList} />}
              {currentStep === 2 && (
                <TicketInfo item={requiredItemList} ticket={ticketInfo} agreements={agreements} />
              )}
              {currentStep === 3 && <PolicyInfo item={requiredItemList} agreements={agreements} />}
              {currentStep === 4 && (
                <PickDropInfo item={requiredItemList} agreements={agreements} />
              )}
            </S.ContentWrapper>
          </FormProvider>
        </S.Container>
      </Layout>
    </>
  );
};

export default EnrollmentDogDetail;
