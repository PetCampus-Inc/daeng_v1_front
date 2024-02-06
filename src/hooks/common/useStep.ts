import { useState } from "react";

const useStep = (initialStep = 0, maxStep: number) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, maxStep));
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  const setStep = (step: number) => setCurrentStep(step);

  return { currentStep, nextStep, prevStep, setStep };
};

export default useStep;
