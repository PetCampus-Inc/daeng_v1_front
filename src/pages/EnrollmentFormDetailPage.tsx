import { PATH } from "constants/path";
import { ADMIN_READ_FORM_STEP } from "constants/step";

import DogInfo from "components/Admin/EnrollmentForm/ReadForm/DogInfo";
import MemberInfo from "components/Admin/EnrollmentForm/ReadForm/MemberInfo";
import PickDropInfo from "components/Admin/EnrollmentForm/ReadForm/PickDropInfo";
import PolicyInfo from "components/Admin/EnrollmentForm/ReadForm/PolicyInfo";
import TicketInfo from "components/Admin/EnrollmentForm/ReadForm/TicketInfo";
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
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { type AdaptedData, useAdminEnrollQuery } from "hooks/api/useAdminEnrollQuery";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const EnrollmentFormDetailPage = () => {
  const { formId } = useParams();
  if (!formId) throw new Error("잘못된 formId 입니다");
  const navigate = useNavigate();

  const { data, isLoading } = useAdminEnrollQuery(formId, "READ");
  const {
    requiredItemList,
    roundTicketNumber,
    monthlyTicketNumber,
    ticketType,
    openDays,
    ...rest
  } = data as AdaptedData<"READ">;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: { ticketType: ticketType.slice(-1)[0], pickDropRequest: "신청", ...rest }
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
          <EditButton type="button" onClick={() => navigate(PATH.ADMIN_EDIT_FORM(formId))}>
            수정
          </EditButton>
        }
      />
      <PageContainer color="BGray" pb="2.5">
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
      </PageContainer>
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default EnrollmentFormDetailPage;
