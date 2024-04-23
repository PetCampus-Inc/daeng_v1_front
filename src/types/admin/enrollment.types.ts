import type { Nullable } from "types/helper.type";

export type TNeutralization = "NEUTERED" | "NOT_NEUTERED";
export type TVaccination = "VACCINATED" | "NOT_VACCINATED";
export type TTicketType = "MONTHLY" | "ROUND";
export type TDogSize = "SMALL" | "MEDIUM" | "BIG";
export type TDogGender = "MALE" | "FEMALE";
export type TMemberGender = "MALE" | "FEMALE";
export type TAttendanceStatus = "ATTENDED" | "NOT_ATTENDED";
export type TPickDropRequest = "REQUEST" | "NOT_REQUEST";
export type TPickDropType = "ROUND" | "ONE_WAY";
export type TSchoolInfo = {
  schoolId: number;
  name: string;
  phoneNumber: string;
  address: string;
};

// 대기 목록 가입신청서 조회
export interface IResponseMemberForm
  extends Omit<IResponseAdminForm, "ticketType" | "roundTicketNumber" | "monthlyTicketNumber"> {
  enrollmentFormId: number;
  memberId: number;
  memberName: string;
  memberGender: TMemberGender;
  address: string;
  phoneNumber: string;
  emergencyNumber: string;
  dogName: string;
  dogGender: TDogGender;
  dogSize: TDogSize;
  breedId: number;
  breedName: Nullable<string>;
  newBreed: Nullable<string>;
  dogBirthDate: number[];
  neutralization: TNeutralization;
  allergyDisease: string;
  vaccination: TVaccination;
  fileUrl: string;
  ticketType: TTicketType;
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: string[];
  pickDropRequest: TPickDropRequest;
  pickDropType: TPickDropType;
  pickDropMemo: string;
  agreements: number[];
  dogId: number;
  school: TSchoolInfo;
  graduateDate: string;
  status: TAttendanceStatus;

  // FIXME: 백엔드에게 인터페이스 변경 요청!!
}

export type IMemberForm = Omit<IResponseMemberForm, "status" | "graduateDate" | "school">;

type TRoundTicketNumber = number[];
type TMonthlyTicketNumber = number[];
export type TPickDropState = "RUNNING" | "NOT_RUNNING";
export type TMemberDto = {
  memberId: number;
  memberName: string;
  memberGender: string;
  memberAddress: string;
  phoneNumber: string;
  emergencyNumber: Nullable<string>;
};

// 원장 가입신청서 미리보기
export interface IResponseAdminForm {
  schoolFormId: number;
  requiredItemList: number[];
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: TRoundTicketNumber;
  openDays: string[];
  monthlyTicketNumber: TMonthlyTicketNumber;
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: TPickDropState;
  pickDropInfo: string;
  pickDropNotice: string;
  member: Nullable<TMemberDto>;
}

// 원장 가입신청서 저장
export interface IRequestAdminEnrollment {
  schoolId: number;
  adminId: number;
  formName: Nullable<string>; // TODO: submit 폼 때문에 Nullable 처리되어 있지만, 다른 방안 고려해보기
  requiredItemList: number[];
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: TRoundTicketNumber;
  openDays: string[];
  monthlyTicketNumber: TMonthlyTicketNumber;
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: TPickDropState;
  pickDropInfo: string;
  pickDropNotice: string;
}
