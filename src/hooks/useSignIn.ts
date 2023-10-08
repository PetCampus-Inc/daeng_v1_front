import { useState, useCallback } from "react";
import { handleGetSearchResult } from "apis/school.api";
import { ISchoolInfo } from "types/School.type";

const useSignIn = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResultText, setSearchResultText] = useState<ISchoolInfo[]>([]);
  const [selectedSearchText, setSelectedSearchText] = useState<string>("");

  const handlerGetSearchResult = useCallback(async () => {
    try {
      const data = await handleGetSearchResult(searchText);
      setSearchResultText(data);
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
