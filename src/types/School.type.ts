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

export interface IEnrollment {
  schoolFormId: number;
  requiredItemList: string;
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: string;
  openDays: string[];
  monthlyTicketNumber: string;
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: string;
  pickDropMemo: string;
  pickDropInfo: string;
  memberDto: IMemberDto;
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
  ticketType: string[];
  roundTicketNumber: string;
  openDays: string[];
  monthlyTicketNumber: string;
  ticketInfo: string;
}

export interface IPolicyInfo {
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
}

export interface IPickDropInfo {
  pickDropState: string;
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
  ticketType: string;
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: string[];
  pickDropRequest: string;
  pickDropType: string;
  pickDropMemo: string;
}
