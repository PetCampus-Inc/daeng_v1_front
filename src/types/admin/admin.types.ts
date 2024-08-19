import type { Nullable } from "../helper.types";

export enum Role {
  APPROVAL_CANCEL = "APPROVAL_CANCEL",
  APPROVAL_DENIED = "APPROVAL_DENIED",
  APPROVAL_PENDING = "APPROVAL_PENDING",
  ROLE_ANONYMOUS = "ROLE_ANONYMOUS",
  ROLE_MEMBER = "ROLE_MEMBER",
  ROLE_OWNER = "ROLE_OWNER",
  ROLE_TEACHER = "ROLE_TEACHER",
  WITHDRAWN = "WITHDRAWN"
}

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

export interface IOwnerProfileEdit {
  imageUrl: string;
  adminId: number;
  adminName: string;
  phoneNumber: string;
}
