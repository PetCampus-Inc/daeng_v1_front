import { MEMBER_DOG_ADD_ENROLL_STEP, MEMBER_ENROLL_STEP } from "constants/step";

import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
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
import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { useBlocker } from "react-router-dom";
import { AUTH_MEMBER_ID } from "store/auth";
import { isEmpty } from "utils/is";

interface EnrollmentProps {
  schoolId?: number; // MEMO: 회원가입 과정 중에 제공하고 있음.
  isMemberAddDog?: boolean; // MEMO: 마이페이지에서 강아지 추가할 경우
}

const NewEnrollmentPage = ({ schoolId, isMemberAddDog }: EnrollmentProps) => {
  // FIXME: memberId가 없을 경우 예외처리 필요
  const memberId = useLocalStorageValue<string>(AUTH_MEMBER_ID) ?? "";

  const { data } = useGetEnrollment({ memberId, schoolId: schoolId ?? -1 });
  const { requiredItemList, pickDropState, roundTicketNumber, monthlyTicketNumber, ...rest } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...defaultFormValues, ...rest }
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

  const ticket = {
    roundTicketNumber,
    monthlyTicketNumber,
    openDays: rest.openDays
  };

  const { dirtyFields } = useFormState({ control: methods.control });
  const blocker = useBlocker(() => !isEmpty(dirtyFields));

  return (
    <>
      {blocker.state === "blocked" ? (
        <PreventLeaveModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
      <Header type="text" text="가입신청서" />
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
              <S.Content $isVisible={currentStep === (isMemberAddDog ? 1 : 2)}>
                <TicketInfo requiredItems={requiredItemList} ticket={ticket} />
              </S.Content>
              <S.Content $isVisible={currentStep === (isMemberAddDog ? 2 : 3)}>
                <PolicyInfo requiredItems={requiredItemList} />
              </S.Content>
              <S.Content $isVisible={currentStep === (isMemberAddDog ? 3 : 4)}>
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
      </Layout>
    </>
  );
};

export default NewEnrollmentPage;

const defaultFormValues = {
  schoolFormId: 0,
  schoolFormName: "",
  priceInfo: "",
  ticketType: [""],
  openDays: [""],
  ticketInfo: "",
  limitsInfo: "",
  accidentInfo: "",
  abandonmentInfo: "",
  pickDropNotice: "",
  pickDropInfo: "",
  member: {
    memberId: 0,
    memberProfileUri: "",
    memberName: "",
    memberGender: "",
    nickName: "",
    address: "",
    addressDetail: "",
    phoneNumber: "",
    emergencyPhoneNumber: "",
    relation: ""
  },
  memberName: "",
  address: "",
  phoneNumber: "",
  emergencyPhoneNumber: "",
  allergyDisease: "",
  dogName: "",
  newBreed: ""
};
