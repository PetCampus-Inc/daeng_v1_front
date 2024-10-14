import { ADMIN_CREATE_FORM_STEP } from "constants/step";

import { Indicator, useAlertPopup, useFormHandlers } from "components/Admin/EnrollmentForm";
import {
  DogInfo,
  MemberInfo,
  PickDropInfo,
  PolicyInfo,
  TicketInfo
} from "components/Admin/EnrollmentForm/EditForm";
import * as Styled from "components/Admin/EnrollmentForm/styles";
import { Layout, WideButton } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import { useGetSchoolForm } from "hooks/api/admin/enroll";
import useStep from "hooks/common/useStep";
import { type FieldValues, FormProvider, useForm, useFormState } from "react-hook-form";
import { useBlocker, useParams } from "react-router-dom";
import { isEmpty } from "utils/is";
import { useEffect } from "react";

interface EnrollmentFormEditProps {
  formValues?: FieldValues;
  onNextStep: (formInfo: FieldValues) => void;
}

export default function EnrollmentFormEditPage({
  formValues,
  onNextStep
}: EnrollmentFormEditProps) {
  const { formId } = useParams<{ formId: string }>();
  const { data } = useGetSchoolForm(Number(formId), "EDIT");

  const methods = useForm({
    mode: "onBlur",
    defaultValues: formValues ?? data,
    shouldFocusError: false,
    shouldUnregister: false // umount 시 값 유지
  });

  const currentSteps = ADMIN_CREATE_FORM_STEP;
  const { currentStep, setStep } = useStep(currentSteps.length - 1);
  const currentTitle = currentSteps[currentStep].title;
  const currentSubtitle = currentSteps[currentStep].subtitle;
  const indicators: string[] = currentSteps.map((s) => s.indicator);

  const openAlertPopup = useAlertPopup();
  const { onSubmit, onInvalid } = useFormHandlers(
    onNextStep,
    openAlertPopup,
    methods.setFocus,
    setStep
  );

  const { dirtyFields } = useFormState({ control: methods.control });

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const currentStep = new URLSearchParams(currentLocation.search).get("step");
    const nextStep = new URLSearchParams(nextLocation.search).get("step");

    if (
      (currentStep === "edit" && nextStep === "submit") ||
      (currentStep === "submit" && nextStep === "edit")
    )
      return false;

    return !isEmpty(dirtyFields);
  });

  const handleNextStep = (formInfo: FieldValues) => {
    methods.reset(formInfo);
    onNextStep && onNextStep(formInfo);
  };

  useEffect(() => {
    methods.reset();
  }, [currentStep]);

  return (
    <>
      {blocker.state === "blocked" ? (
        <PreventLeaveModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
      <Header type="text" text="가입신청서 수정" />
      <Layout bgColor="BGray" px={16} pb={42}>
        <Styled.Container>
          <Styled.TopWrapper>
            <Styled.TitleWrapper>
              <Styled.Title>{currentTitle}</Styled.Title>
              <Styled.SubTitle>{currentSubtitle}</Styled.SubTitle>
            </Styled.TitleWrapper>
            <Indicator indicators={indicators} currentStep={currentStep} goToStep={setStep} />
          </Styled.TopWrapper>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
              <Styled.ContentWrapper>
                <Styled.Content $isVisible={currentStep === 0}>
                  <MemberInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 1}>
                  <DogInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 2}>
                  <TicketInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 3}>
                  <PolicyInfo />
                </Styled.Content>
                <Styled.Content $isVisible={currentStep === 4}>
                  <PickDropInfo />
                </Styled.Content>
              </Styled.ContentWrapper>
              <Styled.ButtonContainer>
                <Styled.HelperText>변경된 내용으로 새로 저장 돼요</Styled.HelperText>
                <WideButton type="submit">수정 완료</WideButton>
              </Styled.ButtonContainer>
            </form>
          </FormProvider>
        </Styled.Container>
      </Layout>
    </>
  );
}
