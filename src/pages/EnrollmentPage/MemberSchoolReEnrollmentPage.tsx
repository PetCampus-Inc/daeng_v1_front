import { MEMBER_DOG_ADD_ENROLL_STEP } from "constants/step";

import { Layout } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import PickDropInfo from "components/Enrollment/Form/PickDropInfo";
import PolicyInfo from "components/Enrollment/Form/PolicyInfo";
import TicketInfo from "components/Enrollment/Form/TicketInfo";
import MemberDogInfo from "components/Enrollment/MemberDogInfoForm/DogInfo";
import Indicator from "components/Enrollment/Stepper/Indicator";
import Navigation from "components/Enrollment/Stepper/Navigation";
import * as S from "components/Enrollment/styles";
import { useGetMemberDogEnrollment } from "hooks/api/member/enroll";
import useStep from "hooks/common/useStep";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { useBlocker } from "react-router-dom";
import { getPadString } from "utils/date";
import { isEmpty } from "utils/is";

interface EnrollmentProps {
  schoolId?: number; // MEMO: 회원가입 과정 중에 제공하고 있음.
  dogId: number;
}

// 유치원 재가입신청 페이지
const MemberSchoolReEnrollmentPage = ({ schoolId, dogId }: EnrollmentProps) => {
  const { data } = useGetMemberDogEnrollment({
    dogId,
    schoolId: schoolId ?? -1
  });

  const {
    pickDropState,
    roundTicketNumber,
    monthlyTicketNumber,
    requiredItemList,
    dogBirthDate,
    breedName,
    member,
    ...rest
  } = data;

  const [dogyear, dogMonth, dogDay] = dogBirthDate;
  const dogBirth = {
    year: dogyear ? dogyear : "",
    month: dogMonth ? getPadString(Number(dogMonth)) : "",
    day: dogDay ? getPadString(Number(dogDay)) : ""
  };

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      ...defaultFormValues,
      ...member,
      newBreed: breedName,
      year: dogBirth.year,
      month: dogBirth.month,
      day: dogBirth.day,
      ...rest
    }
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

  const { dirtyFields, isSubmitSuccessful } = useFormState({ control: methods.control });
  const blocker = useBlocker(() => !isSubmitSuccessful && !isEmpty(dirtyFields));

  const createRequiredItemList = () => {
    const mapList = new Map();
    requiredItemList.forEach((item: number) => mapList.set(item, true));
    return mapList;
  };

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
          <S.TopWrapper top={0}>
            <S.TitleWrapper>
              <S.Title>{currentTitle}</S.Title>
              <S.SubTitle>{currentSubtitle}</S.SubTitle>
            </S.TitleWrapper>
            <Indicator indicators={indicators} currentStep={currentStep} goToStep={setStep} />
          </S.TopWrapper>
          <FormProvider {...methods}>
            <S.ContentWrapper>
              <S.Content $isVisible={currentStep === 0}>
                <MemberDogInfo requiredItems={createRequiredItemList()} />
              </S.Content>
              <S.Content $isVisible={currentStep === 1}>
                <TicketInfo requiredItems={createRequiredItemList()} ticket={ticket} />
              </S.Content>
              <S.Content $isVisible={currentStep === 2}>
                <PolicyInfo requiredItems={createRequiredItemList()} />
              </S.Content>
              <S.Content $isVisible={currentStep === 3}>
                <PickDropInfo requiredItems={createRequiredItemList()} />
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

export default MemberSchoolReEnrollmentPage;

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
