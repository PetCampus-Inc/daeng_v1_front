import { useState, useCallback } from "react";
import { handleGetSearchResult } from "apis/school.api";
import { ISchoolInfo } from "types/School.type";
import {
  handleCheckId,
  handleCheckRegistrationNumber,
  handleOwnerSignUpResult,
  handleTeacherApprove,
  handleTeacherDeny,
  handleTeacherSignUpCancel,
  handleTeacherSignUpSubmit,
} from "apis/admin.api";

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
  const [schoolId, setSchoolId] = useState<number>(-1);
  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolPhone, setSchoolPhone] = useState<string>("");
  const [schoolNum, setSchoolNum] = useState<string>("");
  const [schoolAddress, setSchoolAddress] = useState<string>("");
  const [confirmedId, setConfirmedId] = useState<boolean>(false);
  const [confirmedSchoolNum, setConfirmedSchoolNum] = useState<boolean>(false);
  const [submittedAdminId, setSubmittedAdminId] = useState<number>(-1);
  const [submittedSchoolId, setSubmittedSchoolId] = useState<number>(-1);

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

  // 아이디 중복 확인
  const handlerGetCheckId = useCallback(async () => {
    try {
      const data = await handleCheckId(userId);
      if (data === 200) {
        setConfirmedId(true);
        console.log("available ID");
      } else {
        setConfirmedId(false);
      }
    } catch (error) {
      setConfirmedId(false);
      console.log(error);
    }
  }, [userId, setUserId, setConfirmedId, confirmedId]);

  // 사업자 등록번호 확인
  const handlerCheckSchoolNum = useCallback(async () => {
    try {
      const data = await handleCheckRegistrationNumber(
        schoolNum.replace(/-/g, "")
      );
      if (data === "01") {
        setConfirmedSchoolNum(true);
        console.log("available School Number", data);
      } else {
        setConfirmedSchoolNum(false);
        console.log("not available School Number", data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [schoolNum, setSchoolNum, confirmedSchoolNum, setConfirmedSchoolNum]);

  // 원장 회원가입
  const handlerOwnerSignup = async () => {
    try {
      const data = await handleOwnerSignUpResult({
        userId,
        userPw,
        userName,
        userPhone,
        schoolName,
        schoolPhone,
        schoolAddress,
        schoolNum,
      });
      if (data.status === 200) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 선생님 회원가입 // todo submit 하고 해당 어드민 아이디, 스쿨 아이디 정보 보내기
  const handlerTeacherSignup = async () => {
    try {
      const data = await handleTeacherSignUpSubmit({
        userId,
        userPw,
        schoolId,
        userName,
        userPhone,
      });
      if (data.status === 200) {
        setSubmittedAdminId(data.data.adminId);
        setSubmittedSchoolId(data.data.schoolId);
        setCurrentStep(currentStep + 1);
        console.log("success teacher submit");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 가입 취소
  const handlerTeacherCancel = async () => {
    try {
      const data = await handleTeacherSignUpCancel(submittedAdminId);
      if (data.status === 200) {
        // 요청 이미 보낸걸 어케 지우지..
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 선생님 승인 허가
  const handlerTeacherApprove = async () => {
    try {
      const data = await handleTeacherApprove({
        submittedAdminId,
        submittedSchoolId,
      });
      if (data.status === 200) {
        // 승인되면 선생님 로그인 가능..
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 선생님 승인 거부
  const handlerTeacherDeny = async () => {
    try {
      const data = await handleTeacherDeny(submittedAdminId);
      if (data.status === 200) {
        // 승인 거절 선생님 로그인 불가..
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    schoolId,
    setSchoolId,
    schoolNum,
    setSchoolNum,
    schoolAddress,
    setSchoolAddress,
    handlerGetCheckId,
    confirmedId,
    setConfirmedId,
    handlerCheckSchoolNum,
    confirmedSchoolNum,
    setConfirmedSchoolNum,
    handlerOwnerSignup,
    handlerTeacherSignup,
  };
};

export default useSignUp;
