import type { Nullable } from "../helper.type";

export type TRole = "ROLE_OWNER" | "ROLE_TEACHER";

export type TAdminLoginInfo = {
  adminId: number;
  adminName: string;
  schoolId: number;
  role: TRole;
  schoolName: Nullable<string>;
};

export interface ITeacherSignUpData {
  adminId: number;
  adminName: string;
  role: TRole;
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
