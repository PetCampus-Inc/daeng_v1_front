import axios from "axios";
import customAxios from "libs/CustomAxios";
import { request } from "libs/CustomAxios/request";
import {
  IAdminLoginInfo,
  INewEnrollmentList,
  IOwnerSignUpInfo,
  ITeacherApprove,
  ITeacherList,
  ITeacherSignUpInfo,
  IWaitingOwnerInfo
} from "types/Admin.type";
import { IResponse } from "types/helper.type";
import { ITeacherSubmitResponse } from "types/Response.type";

import type { TAdminLoginInfo } from "types/admin.userInfo.type";

// 아이디 중복확인
export const getCheckId = async (id: string): Promise<number> => {
  const url = `admin/checkid`;
  const { status } = await request<IResponse<void>>({ url, params: { id } });
  return status;
};
// 관리자 로그인
export const postAdminLogin = async (req: IAdminLoginInfo): Promise<TAdminLoginInfo> => {
  const url = `admin/login`;
  const { data } = await request<IResponse<TAdminLoginInfo>>({
    url,
    method: "POST",
    data: {
      id: req.inputId,
      pwd: req.inputPw
    }
  });
  return data;
};

// 사업자번호 확인 api
export const handleCheckRegistrationNumber = async (req: string): Promise<string> => {
  const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_API_KEY}`;
  const { data } = await axios.post(url, {
    b_no: [req]
  });
  return data.data[0].b_stt_cd;
};

// 원장 회원가입
export const handleOwnerSignUpResult = async (
  req: IOwnerSignUpInfo
): Promise<IResponse<TAdminLoginInfo>> => {
  const url = `admin/join/owner`;
  const { data } = await customAxios.post(url, {
    id: req.id,
    pwd: req.pwd,
    name: req.name,
    phoneNumber: req.phoneNumber,
    schoolName: req.schoolName,
    schoolPhoneNumber: req.schoolPhoneNumber,
    schoolAddress: req.schoolAddress,
    registrationNumber: req.registrationNumber
  });
  return data;
};

// 선생님 회원가입 요청
export const handleTeacherSignUpSubmit = async (
  req: ITeacherSignUpInfo
): Promise<ITeacherSubmitResponse> => {
  const url = `admin/submit/teacher/approval`;
  const { data } = await customAxios.post(url, {
    id: req.id,
    pwd: req.pwd,
    schoolId: req.schoolId,
    name: req.name,
    phoneNumber: req.phoneNumber
  });
  return data;
};

// 선생님 회원가입 요청 취소
export const handleTeacherSignUpCancel = async (adminId: number) => {
  const url = `admin/cancel/teacher/approval`;
  const { data } = await customAxios.post(url, adminId);
  return data;
};

// 선생님 가입 승인
export const handleTeacherApprove = async (req: ITeacherApprove) => {
  const url = `admin/approve/teacher/approval`;
  const { data } = await customAxios.post(url, {
    adminId: req.submittedAdminId,
    schoolId: req.submittedSchoolId
  });
  return data;
};

// 선생님 가입 거절
export const handleTeacherDeny = async (adminId: number) => {
  const url = `admin/deny/teacher/approval`;
  const { data } = await customAxios.post(url, adminId);
  return data;
};

// 견주 가입 승인
export const handleMemberApprove = async (memberId: number) => {
  const url = `admin/approve/member/approval`;
  const { data } = await customAxios.post(url, memberId);
  return data;
};

// 견주 가입 거절
export const handleMemberDeny = async (memberId: number) => {
  const url = `admin/deny/member/approval`;
  const { data } = await customAxios.post(url, memberId);
  return data;
};

// 원장 선생님 목록 조회
export const handleGetTeacherList = async (adminId: number): Promise<ITeacherList> => {
  const url = `admin/teachers/main`;
  const { data } = await customAxios.get(url, {
    params: {
      adminId
    }
  });
  return data.data;
};

// 원장 신규관리 메인페이지
export const handleGetNewEnrollment = async (
  adminId: number,
  schoolId: number
): Promise<INewEnrollmentList> => {
  const url = `admin/enrollment/main`;
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
  const url = `admin/enrollment/list`;
  const { data } = await customAxios.get(url, {
    params: {
      schoolId
    }
  });
  return data.data;
};

// 가입신청서 승인
export const handlePostApproveForm = async (enrollmentFormId: number) => {
  const url = `admin/enrollment/approve?enrollmentFormId=${enrollmentFormId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 가입신청서 거절
export const handlePostDenyForm = async (enrollmentFormId: number) => {
  const url = `admin/enrollment/deny?enrollmentFormId=${enrollmentFormId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 선생님 승인
export const handlePostApproveTeacher = async (adminId: number) => {
  const url = `admin/approve/teacher/approval?adminId=${adminId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 선생님 거절
export const handlePostDenyTeacher = async (adminId: number) => {
  const url = `admin/deny/teacher/approval?adminId=${adminId}`;
  const { data } = await customAxios.post(url);
  return data;
};

// 선생님 삭제 (유치원 admin에서 삭제)
export const handleDeleteTeacher = async (adminId: number) => {
  const url = `admin/delete/teacher?adminId=${adminId}`;
  const { data } = await customAxios.post(url);
  return data;
};
