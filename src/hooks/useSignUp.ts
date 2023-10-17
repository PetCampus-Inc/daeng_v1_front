import { useState, useCallback } from "react";
import { handleGetSearchResult } from "apis/school.api";
import { ISchoolInfo } from "types/School.type";

const useSignUp = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResultText, setSearchResultText] = useState<ISchoolInfo[]>([]);
  const [selectedSearchText, setSelectedSearchText] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolPhone, setSchoolPhone] = useState<string>("");
  const [schoolNum, setSchoolNum] = useState<string>("");
  const [schoolAddress, setSchoolAddress] = useState<string>("");

  const handlerGetSearchResult = useCallback(async () => {
    try {
      const data = await handleGetSearchResult(searchText);
      setSearchResultText(data);
    } catch (error) {}
  }, [searchText, setSearchText, searchResultText, setSearchResultText]);

  return {
    currentStep,
    setCurrentStep,
    selectedRole,
    setSelectedRole,
    searchText,
    setSearchText,
    searchResultText,
    setSearchResultText,
    selectedSearchText,
    setSelectedSearchText,
    handlerGetSearchResult,
    userName,
    setUserName,
    userPhone,
    setUserPhone,
    userId,
    setUserId,
    userPw,
    setUserPw,
    schoolName,
    setSchoolName,
    schoolPhone,
    setSchoolPhone,
    schoolNum,
    setSchoolNum,
    schoolAddress,
    setSchoolAddress,
  };
};

export default useSignUp;
