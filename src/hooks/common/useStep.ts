import { useRecoilState } from "recoil";
import { currentStepState } from "store/form";

const useStep = (maxStep: number) => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);

  const nextStep = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, maxStep));
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  const setStep = (step: number) => setCurrentStep(step);

  return { currentStep, nextStep, prevStep, setStep };
};

export default useStep;
