import { PATH } from "constants/path";
import { MEMBER_ENROLL_STEP } from "constants/step";

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
  ContentWrapper
} from "components/Admin/EnrollmentForm/styles";
import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { useGetMemberEnrollment } from "hooks/api/admin/enroll";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberEnrollmentFormDetailPage = () => {
  const { formId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const memberName = queryParams.get("member_name");

  if (!formId) throw new Error("잘못된 formId 입니다");

  const { data } = useGetMemberEnrollment(formId);
  const { pickDropState, ...rest } = data;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: { ...rest }
  });

  const visibleSteps = MEMBER_ENROLL_STEP.filter((step) => step.isVisible(pickDropState));
  const maxSteps = visibleSteps.length;
  const { currentStep, setStep } = useStep(maxSteps - 1);
  const currentTitle = MEMBER_ENROLL_STEP[currentStep].title;
  const currentSubtitle = MEMBER_ENROLL_STEP[currentStep].subtitle;
  const indicators: string[] = visibleSteps.map((step) => step.indicator);

  return (
    <>
      <Header type="text" text={`${memberName}의 가입신청서`} />
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
              {/* {currentStep === 0 && <MemberInfo item={requiredItemList} />}
              {currentStep === 1 && <DogInfo item={requiredItemList} />}
              {currentStep === 2 && <TicketInfo item={requiredItemList}/>}
              {currentStep === 3 && <PolicyInfo item={requiredItemList} />}
              {currentStep === 4 && <PickDropInfo item={requiredItemList} />} */}
            </ContentWrapper>
          </FormProvider>
        </Container>
      </PageContainer>
      <NavBar type="admin" />
    </>
  );
};

export default MemberEnrollmentFormDetailPage;
