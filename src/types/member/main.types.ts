import { Role } from "types/common/role.types";

import type {
  DogGenderType,
  DogSizeType,
  MemberGenderType,
  NeutralizationType,
  PickDropRequestType,
  RelationType,
  VaccinationType
} from "./enrollment.types";
import type { Nullable } from "types/helper.types";
import type { IResponse } from "types/Response.type";

export type TAttendanceStatus = "ATTENDED" | "NOT_ATTENDED";
export type TAgendaStatus = "COMPLETE" | "NOT_YET" | "WRITING";
export type TImageType = "IMAGE" | "PROFILE";
export type TDogStatus = "ENROLLED" | "DROP_OUT" | "APPROVAL_PENDING";

export interface HomeInfoType extends Omit<HomeDataType, "attendanceDate" | "imageList"> {
  attendanceDate: string;
  imageList?: ImageListType[][];
}

export interface ImageListType extends Omit<ImageList, "createdTime"> {
  createdTime: string;
}

export interface HomeDataType {
  memberNickname: string;
  role: typeof Role.ROLE_MEMBER;
  memberProfileUri: string;
  dogId: number;
  dogName: string;
  dogProfile: string;
  status: Nullable<TAttendanceStatus>;
  relation: string;
  attendanceStatus: TAttendanceStatus;
  attendanceDate: number[];
  todayAgendaStatus: TAgendaStatus;
  schoolName: Nullable<string>;
  imageList: Nullable<ImageList[][]>;
}

export interface ImageList {
  imageId: number;
  imageUri: string;
  imageType: TImageType;
  comment?: string;
  createdTime: number[];
  size: number;
}
export interface IDoglist {
  dogId: string;
  dogName: string;
  dogProfile: string;
  status: TDogStatus;
  schoolId: number;
  schoolName: string;
  registeredDate: number[];
  dropOutDate: number[];
}

export interface IDogRejected {
  enrollmentFormId?: number;
  dogName: string;
  registeredDate?: number[];
}

export interface IMemberInfo extends IResponse {
  memberName: string;
  memberNickName: string;
  memberProfileUri: string;
  relation: string;
  doglist: IDoglist[];
}

export interface IMemberProfileInfo extends IResponse {
  memberName: string;
  memberProfileUri: string;
  memberGender: MemberGenderType;
  nickName: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  relation: RelationType;
}

export interface IMemberProfilePostInfo {
  memberName: string;
  memberGender: string;
  memberProfileUri?: string;
  nickName: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  relation: string;
}

export interface IMainAlbum {
  dogId: number;
  date?: string;
}

export interface IDogMemoInfo {
  dogId: string;
  memo: string;
}

export interface VaccinationUri {
  imageId: number;
  imageUri: string;
  imageType: string;
  comment: string | null;
  createdTime: number[];
}
export interface MemberDogInfoData {
  dogId: number;
  dogName: string;
  dogGender: DogGenderType | string;
  dogSize: DogSizeType | string;
  breedId: number;
  breedName: string;
  birthDate: number[];
  neutralization: NeutralizationType | string;
  allergyDisease: string;
  vaccination: VaccinationType;
  profileUri: string;
  vaccinationUri: VaccinationUri[];
  pickDropRequest: PickDropRequestType;
  pickDropType: string;
  pickDropMemo: string;
  member: IMemberProfilePostInfo;
  dogMemo: string | null;
}

export interface DogVaccination {
  dogIdList: number[];
  imageUriList: string[];
  comment: string | "";
}

export interface MemberDogInfoReq {
  dogId: number;
  dogName: string;
  dogGender: DogGenderType | "";
  dogSize: DogSizeType | "";
  breedId: number;
  newBreed: string;
  profileUri: string | "";
  birthDate: string;
  neutralization: NeutralizationType | "";
}

export interface MemberDogInfoFormData
  extends Omit<MemberDogInfoData, "dogGender" | "dogSize" | "neutralization"> {
  dogGender: string;
  dogSize: string;
  neutralization: string;
}

export type DogsDataType = {
  dogId: number;
  dogName: string;
  imageUri: string;
};

export interface IMemberDogSchoolInfo {
  schoolId: number;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface IMemberProfile {
  dogId: number;
  memberProfileUri: string;
  dogProfileUri: string;
  nickName: string;
  relation: string;
}
