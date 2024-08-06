import authAxios from "libs/AuthAxios";

import type { INewEnrollmentList, ITeacherList, IWaitingOwnerInfo } from "types/admin/school.types";

// 견주 가입 승인
export const postMemberApprove = async (memberId: number) => {
  const url = `admin/approve/member/approval`;
  const { data } = await authAxios.post(url, memberId);
  return data;
};

// 견주 가입 거절
export const postMemberDeny = async (memberId: number) => {
  const url = `admin/deny/member/approval`;
  const { data } = await authAxios.post(url, memberId);
  return data;
};

// 원장 선생님 목록 조회
export const getTeacherList = async (adminId: number): Promise<ITeacherList> => {
  const url = `admin/teachers/main`;
  const { data } = await authAxios.get(url, {
    params: {
      adminId
    }
  });
  return data.data;
};

// 원장 신규관리 메인페이지
export const getNewEnrollment = async (
  adminId: number,
  schoolId: number
): Promise<INewEnrollmentList> => {
  const url = `admin/enrollment/main`;
  const { data } = await authAxios.get(url, {
    params: {
      adminId,
      schoolId
    }
  });
  return data.data;
};

// 원장 신규관리 - 가입 신청 승인 대기중인 견주 목록
export const getWaitingOwnersList = async (schoolId: number): Promise<IWaitingOwnerInfo[]> => {
  const url = `admin/enrollment/list`;
  const { data } = await authAxios.get(url, {
    params: {
      schoolId
    }
  });
  return data.data;
};

// 가입신청서 승인
export const postApproveForm = async (enrollmentFormId: number) => {
  const url = `admin/enrollment/approve?enrollmentFormId=${enrollmentFormId}`;
  const { data } = await authAxios.post(url);
  return data;
};

// 가입신청서 거절
export const postDenyForm = async (enrollmentFormId: number) => {
  const url = `admin/enrollment/deny?enrollmentFormId=${enrollmentFormId}`;
  const { data } = await authAxios.post(url);
  return data;
};

// 선생님 승인
export const postApproveTeacher = async (adminId: number) => {
  const url = `admin/approve/teacher/approval?adminId=${adminId}`;
  const { data } = await authAxios.post(url);
  return data;
};

// 선생님 거절
export const postDenyTeacher = async (adminId: number) => {
  const url = `admin/deny/teacher/approval?adminId=${adminId}`;
  const { data } = await authAxios.post(url);
  return data;
};

// 선생님 삭제 (유치원 admin에서 삭제)
export const postDeleteTeacher = async (adminId: number) => {
  const url = `admin/delete/teacher?adminId=${adminId}`;
  const { data } = await authAxios.post(url);
  return data;
};
