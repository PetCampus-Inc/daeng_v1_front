import { useState, useCallback } from "react";
import { handleGetSearchResult } from "apis/school.api";

const useSignIn = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResultText, setSearchResultText] = useState<string[]>([]);
  const [selectedSearchText, setSelectedSearchText] = useState<string>("");

  const handlerGetSearchResult = useCallback(async () => {
    try {
      console.log("done");
      // const data = await handleGetSearchResult(searchText);
      // console.log(data);
    } catch (error) {}
  }, [searchText, setSearchText, searchResultText, setSearchResultText]);

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
    handlerGetSearchResult,
  };
};

export default useSignIn;
