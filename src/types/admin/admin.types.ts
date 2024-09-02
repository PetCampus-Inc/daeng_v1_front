import { Role } from "types/common/role.types";

import type { Nullable } from "../helper.types";

export type AdminAuthType = {
  adminId: number;
  adminName: string;
  schoolId: number;
  role: Role;
  schoolName: string;
};

export interface ITeacherSignUpData {
  adminId: number;
  adminName: string;
  role: Role;
  schoolId: number;
  schoolName: string;
  schoolNumber: Nullable<string>;
  schoolAddress: Nullable<string>;
  registeredDate: Nullable<string>;
  resignedDate: Nullable<string>;
}

export interface IOwnerSignUpInfo {
  id: string;
  pwd: string;
  name: string;
  phoneNumber: string;
  schoolName: string;
  schoolPhoneNumber: string;
  schoolAddress: string;
  registrationNumber: string;
}

export interface ITeacherSignUpInfo {
  id: string;
  pwd: string;
  schoolId: number;
  name: string;
  phoneNumber: string;
}

export interface AdminLoginInfo {
  inputId: string;
  inputPw: string;
  fcmToken: string;
}

export interface IAdminProfileEdit {
  imageUrl: string;
  adminId: number;
  adminName: string;
  phoneNumber: string;
}

export interface ISchoolInfoEdit {
  adminId: number;
  schoolId: number;
  schoolName: string;
  phoneNumber: string;
  address: string;
}

export interface INewAlarm {
  newAlarm: boolean;
}

export interface IAlarmReq {
  alarmId: number;
  category: string;
  adminId: number;
  pageable: {
    page: number;
    size?: 10;
    sort?: [""];
  };
}

export interface IAlarmTicketResponse {
  ticketType: string;
  allRoundTicket: number;
  currentRoundTicket: number;
  monthlyTicketNumber: number;
  ticketStartDate: string; //array?
  ticketExpirationDate: string; //array?
  attendanceDays: string[];
  ticketHistory: string[];
}

export interface IGetAlarm {
  alarmId: number;
  dogId: number;
  dogName: string;
  contentType: string;
  attendanceId: number;
  teacherId: number;
  teacherName: string;
  schoolName: string;
  createdDate: number[]; //string?
  read: boolean; //확인필요
  hasNext: boolean;
  ticketResponse: IAlarmTicketResponse;
}
