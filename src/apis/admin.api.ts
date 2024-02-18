import customAxios from "libs/CustomAxios";
import { IResponse, ITeacherSubmitResponse } from "types/Response.type";
import {
  IAdminLoginInfo,
  INewEnrollmentList,
  IOwnerSignUpInfo,
  ITeacherApprove,
  ITeacherList,
  ITeacherSignUpInfo,
  IWaitingOwnerInfo
} from "types/Admin.type";
import axios from "axios";
import { IAdminLoginResponse } from "types/Attendance.type";

// 아이디 중복확인
export const handleCheckId = async (id: string): Promise<number> => {
  const url: string = `admin/checkid?id=${id}`;
  const { data } = await customAxios.get(url);
  return data.status;
};

// 관리자 로그인
export const handleAdminLoginResult = async (
  req: IAdminLoginInfo
): Promise<IAdminLoginResponse> => {
  const url: string = `admin/login`;
  const { data } = await customAxios.post(url, {
    id: req.inputId,
    pwd: req.inputPw
  });
  return data;
};

// 사업자번호 확인 api
export const handleCheckRegistrationNumber = async (req: string): Promise<string> => {
  const url: string = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_API_KEY}`;
  const { data } = await axios.post(url, {
    b_no: [req]
  });
  return data.data[0].b_stt_cd;
};

// 원장 회원가입
export const handleOwnerSignUpResult = async (req: IOwnerSignUpInfo): Promise<IResponse> => {
  const url: string = `admin/join/owner`;
  const { data } = await customAxios.post(url, {
    id: req.userId,
    pwd: req.userPw,
    name: req.userName,
    phoneNumber: req.userPhone,
    schoolName: req.schoolName,
    schoolPhoneNumber: req.schoolPhone,
    schoolAddress: req.schoolAddress,
    registrationNumber: req.schoolNum
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
    phoneNumber: req.userPhone
  });
  return data;
};

// 선생님 회원가입 요청 취소
export const handleTeacherSignUpCancel = async (adminId: number): Promise<IResponse> => {
  const url: string = `admin/cancel/teacher/approval`;
  const { data } = await customAxios.post(url, adminId);
  return data;
};

// 선생님 가입 승인
export const handleTeacherApprove = async (req: ITeacherApprove): Promise<IResponse> => {
  const url: string = `admin/approve/teacher/approval`;
  const { data } = await customAxios.post(url, {
    adminId: req.submittedAdminId,
    schoolId: req.submittedSchoolId
  });
  return data;
};

// 선생님 가입 거절
export const handleTeacherDeny = async (adminId: number): Promise<IResponse> => {
  const url: string = `admin/deny/teacher/approval`;
  const { data } = await customAxios.post(url, adminId);
  return data;
};

// 견주 가입 승인
export const handleMemberApprove = async (memberId: number): Promise<IResponse> => {
  const url: string = `admin/approve/member/approval`;
  const { data } = await customAxios.post(url, memberId);
  return data;
};

// 견주 가입 거절
export const handleMemberDeny = async (memberId: number): Promise<IResponse> => {
  const url: string = `admin/deny/member/approval`;
  const { data } = await customAxios.post(url, memberId);
  return data;
};

// 원장 선생님 목록 조회
export const handleGetTeacherList = async (
  adminId: number,
  schoolId: number
): Promise<ITeacherList> => {
  const url: string = `admin/teachers/main`;
  const { data } = await customAxios.get(url, {
    params: {
      adminId,
      schoolId
    }
  });
  return data.data;
};

// 원장 신규관리 메인페이지
export const handleGetNewEnrollment = async (
  adminId: number,
  schoolId: number
): Promise<INewEnrollmentList> => {
  const url: string = `admin/enrollment/main`;
  const { data } = await customAxios.get(url, {
    params: {
      adminId,
      schoolId
    }
  });
  return data.data;
};

// 원장 신규관리 - 가입 신청 승인 대기중인 견주 목록
export const handleGetWaitingOwnersList = async (
  schoolId: number
): Promise<IWaitingOwnerInfo[]> => {
  const url: string = `admin/enrollment/list`;
  const { data } = await customAxios.get(url, {
    params: {
      schoolId
    }
  });
  return data.data;
};

// 가입신청서 승인
export const handlePostApproveForm = async (enrollmentFormId: number): Promise<IResponse> => {
  const url: string = `admin/enrollment/approve?enrollmentFormId=${enrollmentFormId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 가입신청서 거절
export const handlePostDenyForm = async (enrollmentFormId: number): Promise<IResponse> => {
  const url: string = `admin/enrollment/deny?enrollmentFormId=${enrollmentFormId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 선생님 승인
export const handlePostApproveTeacher = async (adminId: number): Promise<IResponse> => {
  const url: string = `admin/approve/teacher/approval?adminId=${adminId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 선생님 거절
export const handlePostDenyTeacher = async (adminId: number): Promise<IResponse> => {
  const url: string = `admin/deny/teacher/approval?adminId=${adminId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 선생님 삭제 (유치원 admin에서 삭제)
export const handleDeleteTeacher = async (adminId: number): Promise<IResponse> => {
  const url: string = `admin/delete/teacher?adminId=${adminId}`;
  const { data } = await customAxios.post(url);
  console.log(data);
  return data;
};
