import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAdminEnrollQuery } from "hooks/api/useAdminEnrollQuery";
import useStep from "hooks/common/useStep";

import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import Indicator from "components/Admin/EnrollmentForm/Stepper/Indicator";
import MemberInfo from "components/Admin/EnrollmentForm/EditForm/MemberInfo";
import DogInfo from "components/Admin/EnrollmentForm/EditForm/DogInfo";
import TicketInfo from "components/Admin/EnrollmentForm/EditForm/TicketInfo";
import PolicyInfo from "components/Admin/EnrollmentForm/EditForm/PolicyInfo";
import PickDropInfo from "components/Admin/EnrollmentForm/EditForm/PickDropInfo";
import SubmitButton from "components/Admin/EnrollmentForm/Stepper/SubmitButton";

import { PATH } from "constants/path";
import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import {
  Container,
  TopWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  ContentWrapper,
  ButtonContainer,
  HelperText
} from "components/Admin/EnrollmentForm/styles";
import { useEffect } from "react";

const EnrollmentFormEditPage = () => {
  const { formId } = useParams();
  if (!formId) throw new Error("잘못된 formId 입니다");

  const { data } = useAdminEnrollQuery(formId);
  const REQUIRED_ITEMS = data?.requiredItemsMap;

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, setStep } = useStep(0, currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  // FIXME: 최초 한번만 실행되면 되지만 이 페이지는 자주 언마운트 되기 때문에 메모리 낭비되고 있는 상황입니다. 수정이 필요합니다.
  useEffect(() => {
    if (REQUIRED_ITEMS) {
      REQUIRED_ITEMS.forEach((isRequired, key) => {
        const fieldName = `requiredItemList.${key}`;
        methods.setValue(fieldName, isRequired);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [REQUIRED_ITEMS]);

  return (
    <>
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
            {currentStep === 0 && <MemberInfo requiredItems={data?.requiredItemsMap} />}
            {currentStep === 1 && <DogInfo requiredItems={data?.requiredItemsMap} />}
            {currentStep === 2 && (
              <TicketInfo info={data?.ticketInfo} requiredItems={data?.requiredItemsMap} />
            )}
            {currentStep === 3 && (
              <PolicyInfo info={data?.policyInfo} requiredItems={data?.requiredItemsMap} />
            )}
            {currentStep === 4 && (
              <PickDropInfo info={data?.pickDropInfo} requiredItems={data?.requiredItemsMap} />
            )}
          </ContentWrapper>
          <ButtonContainer>
            <HelperText>변경된 내용으로 새로 저장 돼요</HelperText>
            <SubmitButton type="EDIT" />
          </ButtonContainer>
        </FormProvider>
      </Container>
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default EnrollmentFormEditPage;
