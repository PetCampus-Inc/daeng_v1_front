export interface ISchoolInfo {
  schoolId: number;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface IBreedInfo {
  data: {
    breedId: number;
    breedName: string;
  }[];
}

export type TPickDropState = "RUNNING" | "NOT_RUNNING";
export type TPickDropRequest = "REQUEST" | "NOT_REQUEST";
export type TTicketType = "ROUND" | "MONTHLY";
type TRoundTicketNumber = number[];
type TMonthlyTicketNumber = number[];

export interface IEnrollment {
  schoolFormId: number;
  requiredItemList: number[];
  priceInfo: string;
  ticketType: TTicketType[];
  roundTicketNumber: TRoundTicketNumber;
  openDays: string[];
  monthlyTicketNumber: TMonthlyTicketNumber;
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: TPickDropState;
  pickDropMemo: string;
  pickDropInfo: string;
  pickDropNotice: string;
  memberDto: IMemberDto | null;
}
export interface IMemberDto {
  memberId: number;
  memberName: string;
  memberGender: string;
  memberAddress: string;
  phoneNumber: string;
  emergencyNumber: string;
}

export interface ITicketInfo {
  priceInfo: string;
  ticketType: TTicketType[];
  roundTicketNumber: TRoundTicketNumber;
  openDays: string[];
  monthlyTicketNumber: TMonthlyTicketNumber;
  ticketInfo: string;
}

export interface IPolicyInfo {
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
}

export interface IPickDropInfo {
  pickDropState: TPickDropState;
  pickDropNotice: string;
  pickDropMemo: string;
  pickDropInfo: string;
}

export interface IRequestEnrollment {
  schoolFormId: number;
  memberId: number;
  memberName: string;
  memberGender: string;
  address: string;
  phoneNumber: string;
  emergencyNumber: string;
  dogName: string;
  dogGender: string;
  dogSize: string;
  breedId: number;
  newBreed: string;
  birthDate: string;
  neutralization: string;
  vaccination: string;
  fileUrl: string;
  allergyDisease: string;
  ticketType: TTicketType;
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: string[];
  pickDropRequest: TPickDropRequest;
  pickDropType: string;
  pickDropMemo: string;
}

export interface IRequestForm {
  schoolId: number;
  adminId: number;
  formName: string | null;
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
  pickDropState: string;
  pickDropInfo: string;
  pickDropNotice: string;
}
