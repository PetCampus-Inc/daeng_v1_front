import type { Nullable } from "types/helper.types";

export interface IOwnerInfo {
  adminName: string;
  phoneNumber: string;
  id: string;
  role: string;
  imageUrl: string;
  schoolId: number;
  schoolName: string;
  schoolNumber: string;
  address: string;
  registrationNumber: string;
  registeredDate: Nullable<number[]>;
}
export interface ITeacherInfo {
  id: string;
  adminName: string;
  schoolId: number;
  schoolName: string;
  phoneNumber: string;
  schoolNumber: string;
  schoolAddress: string;
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
