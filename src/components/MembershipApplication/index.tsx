import { FormProvider, useForm } from "react-hook-form";
import useStep from "hooks/useStep";

import DogInfo from "./Form/DogInfo";
import DogOwnerInfo from "./Form/DogOwnerInfo";
import NoticeInfo from "./Form/NoticeInfo";
import PickDropInfo from "./Form/PickDropInfo";
import TicketInfo from "./Form/TicketInfo";
import StepNavigation from "./Form/StepNavigation";

import * as S from "./styles";

const stepsComponents = [DogInfo, DogOwnerInfo, NoticeInfo, PickDropInfo, TicketInfo];

const MembershipApplication = () => {
  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false
  });
  const { currentStep, nextStep, prevStep } = useStep(0, stepsComponents.length - 1);

  const CurrentComponent = stepsComponents[currentStep];

  return (
    <>
      <FormProvider {...methods}>
        <CurrentComponent />
        <StepNavigation
          currentStep={currentStep}
          stepsLength={stepsComponents.length}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </FormProvider>
    </>
  );
};

export default MembershipApplication;
