import { useState } from "react";

const useSignIn = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");

  return {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
  };
};

export default useSignIn;
