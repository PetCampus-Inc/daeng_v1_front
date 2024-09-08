import axios from "axios";
import { request } from "libs/AuthAxios/request";

import type {
  IOwnerSignUpInfo,
  ITeacherSignUpData,
  ITeacherSignUpInfo,
  AdminAuthType,
  AdminLoginInfo,
  INewAlarm,
  IAlarmReq,
  IGetAlarm
} from "types/admin/admin.types";

// 아이디 중복확인
export const getCheckId = async (id: string): Promise<number> => {
  const url = `admin/checkid`;
  const { status } = await request<void>({ url, params: { id } });
  return status;
};

// 관리자 로그인
export const postAdminLogin = async (req: AdminLoginInfo): Promise<AdminAuthType> => {
  const url = `admin/login`;
  const { data } = await request<AdminAuthType>({
    url,
    method: "POST",
    data: {
      id: req.inputId,
      pwd: req.inputPw,
      fcmToken: req.fcmToken
    }
  });
  return data;
};

// 사업자번호 확인 api
export const postRegistrationNumber = async (req: string): Promise<string> => {
  const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_API_KEY}`;
  const { data } = await axios.post(url, {
    b_no: [req]
  });
  return data.data[0].b_stt_cd;
};

// 원장 회원가입
export const postOwnerSignUp = async (req: IOwnerSignUpInfo) => {
  const url = `admin/join/owner`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      id: req.id,
      pwd: req.pwd,
      name: req.name,
      phoneNumber: req.phoneNumber,
      schoolName: req.schoolName,
      schoolPhoneNumber: req.schoolPhoneNumber,
      schoolAddress: req.schoolAddress,
      registrationNumber: req.registrationNumber
    }
  });
};

// 선생님 회원가입
export const postTeacherSignUp = async (req: ITeacherSignUpInfo): Promise<ITeacherSignUpData> => {
  const url = `admin/submit/teacher/approval`;
  const { data } = await request<ITeacherSignUpData>({
    url,
    method: "POST",
    data: {
      id: req.id,
      pwd: req.pwd,
      schoolId: req.schoolId,
      name: req.name,
      phoneNumber: req.phoneNumber
    }
  });
  return data;
};

// 선생님 회원가입 요청 취소
export const postTeacherSignUpCancel = async (adminId: number) => {
  const url = `admin/cancel/teacher/approval`;
  return await request<void>({
    url,
    method: "POST",
    params: {
      adminId
    }
  });
};

//새로운 알림 여부
export const handleGetNewAlarm = async (adminId: number) => {
  const url = `admin/alarm/new`;
  const { data } = await request<INewAlarm>({
    url,
    params: {
      adminId
    }
  });
  return data;
};

//알림 가져오기
export const handleGetAlarm = async (req: IAlarmReq) => {
  const url = `admin/alarm`;
  const { data } = await request<IGetAlarm[]>({
    url,
    params: {
      alarmId: req.alarmId,
      category: req.category,
      adminId: req.adminId,
      pageable: {
        page: req.pageable.page,
        size: req.pageable.size,
        sort: req.pageable.sort
      }
    }
  });
  return data;
};
