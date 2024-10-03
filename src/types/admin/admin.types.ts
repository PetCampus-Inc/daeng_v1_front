import { Role } from "types/common/role.types";

import type { Nullable } from "../helper.types";

export interface AdminProfile {
  adminName: string;
  phoneNumber: string;
  profileUri: string;
  schoolId: number;
  schoolName: string;
}

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

export interface AdminProfileUpdate {
  adminName: string;
  phoneNumber: string;
  imageUrl: string;
}

export interface ISchoolInfoEdit {
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
  pageable: {
    page: number;
    size?: number;
    sort?: string[];
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

export interface AdminDogImageRequest {
  dogId: number;
  page?: number;
  size?: number;
}

export interface AdminDogImageResponse {
  totalPage: number;
  totalElement: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  list: AdminDogImage[];
}

export interface AdminDogImage {
  imageId: number;
  imageUrl: string;
  createdAt: string;
}
