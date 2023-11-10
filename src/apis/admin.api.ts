import customAxios from "libs/CustomAxios";
import { IResponse, ITeacherSubmitResponse } from "types/Response.type";
import {
  IAdminLoginInfo,
  IOwnerSignUpInfo,
  ITeacherApprove,
  ITeacherSignUpInfo,
} from "types/Admin.type";
import axios from "axios";

// 아이디 중복확인
export const handleCheckId = async (id: string): Promise<number> => {
  const url: string = `admin/checkid?id=${id}`;
  const { data } = await customAxios.get(url);
  return data.status;
};

// 관리자 로그인
export const handleAdminLoginResult = async (
  req: IAdminLoginInfo
): Promise<IResponse> => {
  const url: string = `admin/login`;
  const { data } = await customAxios.post(url, {
    id: req.inputId,
    pwd: req.inputPw,
  });
  return data;
};

// 사업자번호 확인 api
export const handleCheckRegistrationNumber = async (
  req: string
): Promise<string> => {
  const url: string = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_API_KEY}`;
  const { data } = await axios.post(url, {
    b_no: [req],
  });
  return data.data[0].b_stt_cd;
};

// 원장 회원가입
export const handleOwnerSignUpResult = async (
  req: IOwnerSignUpInfo
): Promise<IResponse> => {
  const url: string = `admin/join/owner`;
  const { data } = await customAxios.post(url, {
    id: req.userId,
    pwd: req.userPw,
    name: req.userName,
    phoneNumber: req.userPhone,
    schoolName: req.schoolName,
    schoolPhoneNumber: req.schoolPhone,
    schoolAddress: req.schoolAddress,
    registrationNumber: req.schoolNum,
  });
  return data;
};

// 선생님 회원가입 요청
export const handleTeacherSignUpSubmit = async (
  req: ITeacherSignUpInfo
): Promise<ITeacherSubmitResponse> => {
  const url: string = `admin/submit/teacher/approval`;
  const { data } = await customAxios.post(url, {
    id: req.userId,
    pwd: req.userPw,
    schoolId: req.schoolId,
    name: req.userName,
    phoneNumber: req.userPhone,
  });
  return data;
};

// 선생님 회원가입 요청 취소
export const handleTeacherSignUpCancel = async (
  adminId: number
): Promise<IResponse> => {
  const url: string = `admin/cancel/teacher/approval`;
  const { data } = await customAxios.post(url, adminId);
  return data;
};

// 선생님 가입 승인
export const handleTeacherApprove = async (
  req: ITeacherApprove
): Promise<IResponse> => {
  const url: string = `admin/approve/teacher/approval`;
  const { data } = await customAxios.post(url, {
    adminId: req.submittedAdminId,
    schoolId: req.submittedSchoolId,
  });
  return data;
};

// 선생님 가입 거절
export const handleTeacherDeny = async (
  adminId: number
): Promise<IResponse> => {
  const url: string = `admin/deny/teacher/approval`;
  const { data } = await customAxios.post(url, adminId);
  return data;
};

// 견주 가입 승인
export const handleMemberApprove = async (
  memberId: number
): Promise<IResponse> => {
  const url: string = `admin/approve/member/approval`;
  const { data } = await customAxios.post(url, memberId);
  return data;
};

// 견주 가입 거절
export const handleMemberDeny = async (
  memberId: number
): Promise<IResponse> => {
  const url: string = `admin/deny/member/approval`;
  const { data } = await customAxios.post(url, memberId);
  return data;
};
