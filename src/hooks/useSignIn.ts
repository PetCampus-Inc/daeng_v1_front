import { useState } from "react";

const useSignIn = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResultText, setSearchResultText] = useState<string[]>([]);
  const [selectedSearchText, setSelectedSearchText] = useState<string>("");

  return {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
    selectedRole,
    setSelectedRole,
    searchText,
    setSearchText,
    searchResultText,
    setSearchResultText,
    selectedSearchText,
    setSelectedSearchText,
  };
};

export default useSignIn;
