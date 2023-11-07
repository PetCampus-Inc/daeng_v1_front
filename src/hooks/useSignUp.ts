import { useState, useCallback } from "react";
import { handleGetSearchResult } from "apis/school.api";
import { ISchoolInfo } from "types/School.type";
import { handleCheckId } from "apis/admin.api";

const useSignUp = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
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
  const [confirmedId, setConfirmedId] = useState<boolean>(false);

  const handlerGetSearchResult = useCallback(async () => {
    try {
      const data = await handleGetSearchResult(searchText);
      setSearchResultText(data);
    } catch (error) {
      console.log(error);
    }
  }, [searchText, setSearchText, searchResultText, setSearchResultText]);

  const handlerDeleteSearchResult = () => {
    setSelectedSearchText("");
    setSearchText("");
  };

  const handlerGetCheckId = useCallback(async () => {
    try {
      const data = await handleCheckId(userId);
      if (data === 200) {
        setConfirmedId(true);
        console.log("available ID");
      }
    } catch (error) {
      setConfirmedId(false);
      console.log(error);
    }
  }, [userId, setUserId, setConfirmedId, confirmedId]);

  return {
    currentMainStep,
    setCurrentMainStep,
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
    handlerDeleteSearchResult,
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
    handlerGetCheckId,
    confirmedId,
    setConfirmedId,
  };
};

export default useSignUp;
