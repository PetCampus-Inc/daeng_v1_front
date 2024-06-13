import { MEMBER_ENROLL_STEP } from "constants/step";

import DogInfo from "components/Admin/EnrollmentForm/MemberReadForm/DogInfo";
import MemberInfo from "components/Admin/EnrollmentForm/MemberReadForm/MemberInfo";
import PickDropInfo from "components/Admin/EnrollmentForm/MemberReadForm/PickDropInfo";
import PolicyInfo from "components/Admin/EnrollmentForm/MemberReadForm/PolicyInfo";
import TicketInfo from "components/Admin/EnrollmentForm/MemberReadForm/TicketInfo";
import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import {
  Container,
  TopWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  ContentWrapper
} from "components/Admin/EnrollmentForm/styles";
import { Layout } from "components/common";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { useGetMemberEnrollment } from "hooks/api/admin/enroll";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

const MemberEnrollmentFormDetailPage = () => {
  const { formId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const memberName = queryParams.get("member_name");

  if (!formId) throw new Error("잘못된 formId 입니다");

  const { data } = useGetMemberEnrollment(formId);
  const { requiredItemList, agreements, ...rest } = data;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      ...rest
    }
  });

  const visibleSteps = MEMBER_ENROLL_STEP.filter((step) =>
    step.isVisible(data.schoolFormResponse.pickDropState)
  );
  const maxSteps = visibleSteps.length;
  const { currentStep, setStep } = useStep(maxSteps - 1);
  const currentTitle = MEMBER_ENROLL_STEP[currentStep].title;
  const currentSubtitle = MEMBER_ENROLL_STEP[currentStep].subtitle;
  const indicators: string[] = visibleSteps.map((step) => step.indicator);

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
      <Header type="text" text={`${memberName}의 가입신청서`} />
      <Layout type="page" bg="BGray" pb={40}>
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
              {currentStep === 0 && <MemberInfo item={requiredItemList} />}
              {currentStep === 1 && <DogInfo item={requiredItemList} />}
              {currentStep === 2 && (
                <TicketInfo item={requiredItemList} ticket={ticketInfo} agreements={agreements} />
              )}
              {currentStep === 3 && <PolicyInfo item={requiredItemList} agreements={agreements} />}
              {currentStep === 4 && (
                <PickDropInfo item={requiredItemList} agreements={agreements} />
              )}
            </ContentWrapper>
          </FormProvider>
        </Container>
      </Layout>
      <NavBar type="admin" />
    </>
  );
};

export default MemberEnrollmentFormDetailPage;
