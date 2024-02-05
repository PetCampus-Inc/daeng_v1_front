import { FormProvider, useForm } from "react-hook-form";
import useStep from "hooks/useStep";

import DogOwnerInfo from "./Form/DogOwnerInfo";
import DogInfo from "./Form/DogInfo";
import NoticeInfo from "./Form/NoticeInfo";
import PickDropInfo from "./Form/PickDropInfo";
import TicketInfo from "./Form/TicketInfo";
import Navigation from "./Stepper/Navigation";

import * as S from "./styles";
import Indicator from "./Stepper/Indicator";

// FIXME: 이 부분 위치 수정 필요합니다.
const step = [
  {
    title: "견주 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "견주 정보",
    component: DogOwnerInfo
  },
  {
    title: "강아지 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "강아지 정보",
    component: DogInfo
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "이용권 정보",
    component: TicketInfo
  },
  {
    title: "유의사항을 확인해주세요",
    subtitle: "필수입력에 동의하지 않으면 가입이 어려울 수 있어요",
    indicator: "유의사항",
    component: NoticeInfo
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "픽드랍",
    component: PickDropInfo
  }
];

const MembershipApplication = () => {
  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false
  });
  const { currentStep, nextStep, prevStep, setStep } = useStep(0, step.length - 1);

  const CurrentComponent = step[currentStep].component;
  const currentTitle = step[currentStep].title;
  const currentSubtitle = step[currentStep].subtitle;
  const indicators: string[] = step.map((s) => s.indicator);

  return (
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
          <CurrentComponent />
        </S.ContentWrapper>
        <Navigation
          currentStep={currentStep}
          stepsLength={step.length}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </FormProvider>
    </S.Container>
  );
};

export default MembershipApplication;
