import { useState } from "react";

const useSignIn = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);

  return {
    currentMainStep,
    setCurrentMainStep,
    currentStep,
    setCurrentStep,
    currentRole,
    setCurrentRole,
  };
};

export default useSignIn;
