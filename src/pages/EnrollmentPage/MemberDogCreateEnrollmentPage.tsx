import { MEMBER_DOG_ADD_ENROLL_STEP } from "constants/step";

import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import DogInfo from "components/Enrollment/Form/DogInfo";
import PickDropInfo from "components/Enrollment/Form/PickDropInfo";
import PolicyInfo from "components/Enrollment/Form/PolicyInfo";
import TicketInfo from "components/Enrollment/Form/TicketInfo";
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
}

// 강아지 추가 가입신청 페이지
const MemberDogCreateEnrollmentPage = ({ schoolId }: EnrollmentProps) => {
  // FIXME: memberId가 없을 경우 예외처리 필요
  const memberId = useLocalStorageValue<string>(AUTH_MEMBER_ID) ?? "1";
  const { data } = useGetEnrollment({ memberId, schoolId: schoolId ?? -1 });
  const {
    requiredItemList,
    pickDropState,
    roundTicketNumber,
    monthlyTicketNumber,
    member,
    ...rest
  } = data;

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...defaultFormValues, ...member, ...rest }
  });

  const visibleSteps = MEMBER_DOG_ADD_ENROLL_STEP.filter((step) => step.isVisible(pickDropState));
  const maxSteps = visibleSteps.length;

  const { currentStep, nextStep, prevStep, setStep } = useStep(maxSteps - 1);

  const currentTitle = MEMBER_DOG_ADD_ENROLL_STEP[currentStep].title;

  const currentSubtitle = MEMBER_DOG_ADD_ENROLL_STEP[currentStep].subtitle;

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
      <Header type="text" text="가입신청서2" />
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
                <DogInfo requiredItems={requiredItemList} />
              </S.Content>
              <S.Content $isVisible={currentStep === 1}>
                <TicketInfo requiredItems={requiredItemList} ticket={ticket} />
              </S.Content>
              <S.Content $isVisible={currentStep === 2}>
                <PolicyInfo requiredItems={requiredItemList} />
              </S.Content>
              <S.Content $isVisible={currentStep === 3}>
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

export default MemberDogCreateEnrollmentPage;

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
