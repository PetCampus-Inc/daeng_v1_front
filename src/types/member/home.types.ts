import { IResponse } from "types/Response.type";

export type TAttendanceStatus = "ATTENDED" | "NOT_ATTENDED";
export type TAgendaStatus = "COMPLETE" | "NOT_YET" | "WRITING";
export type TImageType = "IMAGE" | "PROFILE";
export type TDogStatus = "ENROLLED" | "DROP_OUT" | "APPROVAL_PENDING";

export interface IHome {
  dogId: number;
  dogName: string;
  memberId: number;
  relation: string;
  attendanceStatus?: TAttendanceStatus;
  attendanceDate?: string;
  todayAgendaStatus: TAgendaStatus;
  imageList: ImageList[][];
}

export interface ImageList {
  imageId: number;
  imageUri: string;
  imageType: TImageType;
  comment?: string;
  createdTime: string;
}
interface IDoglist {
  dogId: string;
  dogName: string;
  dogProfile: string;
  status: TDogStatus;
  schoolId: number;
  schoolName: string;
  registeredDate: number[];
  dropOutDate: number[];
}
export interface IMemberInfo extends IResponse {
  memberId: string;
  memberName: string;
  memberNickName: string;
  memberProfileUri: string;
  relation: string;
  doglist: IDoglist[];
}

export interface IMemberProfileInfo extends IResponse {
  memberId: string;
  memberName: string;
  memberGender: string;
  nickName: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  relation: string;
}

export interface IMemberProfilePostInfo {
  memberId: string;
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
export interface IMainAlbumData extends Omit<ImageList, "createdTime"> {
  createdTime: number[];
}

export interface IMainAlbum {
  dogId: number;
  date?: string;
}

export interface IDogMemoInfo {
  dogId: string;
  memo: string;
}

export interface IMemberDogPostDetailInfo {
  dogId: number;
  dogName: string;
  dogGender: string;
  dogSize?: string;
  breedId: number;
  newBreed: string;
  birthDate: string;
  neutralization: string;
}

export interface IMemberDogInfo extends IResponse {
  dogId: number;
  dogName: string;
  dogGender: string;
  dogSize: string;
  breedId: number;
  breedName: string;
  dogBirthDate: number[];
  neutralization: string;
  allergyDisease: string;
  vaccination: string;
  profileUri: string;
  vaccinationUri: string | null;
  pickDropRequest: string;
  pickDropType: string;
  pickDropMemo: string;
  member: IMemberProfilePostInfo;
  dogMemo: string;
}

export interface IMemberDogInfo {
  dogId: number;
}
