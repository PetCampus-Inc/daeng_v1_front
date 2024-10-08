import type { Nullable } from "types/helper.types";

export interface IOwnerInfo {
  adminId: number;
  adminName: string;
  phoneNumber: string;
  id: string;
  role: string;
  profileUri: string;
  schoolId: number;
  schoolName: string;
  schoolNumber: string;
  address: string;
  addressDetail: string;
  registrationNumber: string;
  registeredDate: Nullable<number[]>;
}
export interface ITeacherInfo {
  id: string;
  adminName: string;
  adminId: number;
  profileUri: string;
  schoolId: number;
  schoolName: string;
  phoneNumber: string;
  schoolNumber: string;
  schoolAddress: string;
  schoolAddressDetail: string;
  enrollDate: number[];
  registeredDate: number[];
  school: {
    schoolId: number;
    name: string;
    phoneNumber: string;
    address: string;
  };
}

export interface ISchoolCallInfo {
  schoolName: string | undefined;
  schoolNumber: string | undefined;
}
