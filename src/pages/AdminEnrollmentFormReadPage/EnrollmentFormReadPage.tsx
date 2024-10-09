import { routes } from "constants/path";
import { ADMIN_READ_FORM_STEP } from "constants/step";

import {
  DogInfo,
  MemberInfo,
  PickDropInfo,
  PolicyInfo,
  TicketInfo
} from "components/Admin/EnrollmentForm/ReadForm";
import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import {
  Container,
  TopWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  ContentWrapper,
  EditButton
} from "components/Admin/EnrollmentForm/styles";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { AdminNavBar } from "components/common/NavBar";
import { type FormAdaptedData, useAdminEnrollment } from "hooks/api/admin/enroll";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EnrollmentFormReadPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useAdminEnrollment(Number(formId), "READ");
  const {
    requiredItemList,
    roundTicketNumber,
    monthlyTicketNumber,
    ticketType,
    openDays,
    ...rest
  } = data as FormAdaptedData<"READ">;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: true,
    defaultValues: { ticketType: ticketType[0], pickDropRequest: "신청", ...rest }
  });

  const visibleSteps = ADMIN_READ_FORM_STEP.filter((step) => step.isVisible(data.pickDropState));
  const maxSteps = visibleSteps.length;
  const { currentStep, setStep } = useStep(maxSteps - 1);
  const currentTitle = ADMIN_READ_FORM_STEP[currentStep].title;
  const currentSubtitle = ADMIN_READ_FORM_STEP[currentStep].subtitle;
  const indicators: string[] = visibleSteps.map((step) => step.indicator);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const ticket = {
    roundTicketNumber,
    monthlyTicketNumber,
    openDays
  };

  return (
    <>
      <Header
        type="text"
        text="미리보기"
        rightElement={
          <EditButton
            type="button"
            onClick={() => navigate(routes.admin.school.enrollment.ownerForms.edit.dynamic(formId))}
          >
            수정
          </EditButton>
        }
      />
      <Layout type="main" bgColor="BGray" px={16} pb={40}>
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
              {currentStep === 2 && <TicketInfo item={requiredItemList} ticket={ticket} />}
              {currentStep === 3 && <PolicyInfo item={requiredItemList} />}
              {currentStep === 4 && <PickDropInfo item={requiredItemList} />}
            </ContentWrapper>
          </FormProvider>
        </Container>
      </Layout>
      <AdminNavBar />
    </>
  );
};

export default EnrollmentFormReadPage;
