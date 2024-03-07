export type IAttendanceInfo = IDogsList[];

export interface IAttendSearchInfo {
  data: IAttendDogLists[];
  status: number;
}

export type IAttendDogsInfo = IAttendDogLists[];

export interface IAttendCareDogInfo {
  data: IAttendCareDog[];
  status: number;
}

export interface IAdminLoginResponse {
  data: {
    adminId: number;
    adminName: string;
    schoolId: number;
    role: string;
    schoolName: string;
  };
  status: number;
}

export interface IDogsList {
  dogId: number;
  dogName: string;
  allRounds: number;
  currentRounds: number;
  monthlyTicket: [];
}

export interface IAttendDogLists {
  attendanceId: number;
  dogId: number;
  dogName: string;
  allRounds: number;
  currentRounds: number;
  monthlyTicket: string;
}

export interface IAttendCareDog {
  attendanceId: number;
  dogId: number;
  dogName: string;
  status: string;
  adminName: string;
}

export interface IMemberCallInfo {
  dogName: string;
  phoneNumber: string;
}

export interface IAlarmResponse {
  data: {
    dogId: number;
    dogName: string;
    allRounds: number;
    currentRounds: number;
    memberId: number;
    memberName: string;
    memberPhoneNumber: string;
    schoolId: number;
    schoolName: string;
    schoolPhoneNumber: string;
  };
  status: number;
}

export interface IAttendInfo {
  schoolId: number;
  selectedDogIds: number[];
}

export interface IAttendCareInfo {
  adminId: number;
  selectedDogId: number[];
}

export interface IDogDetails {
  dogId: number;
  dogName: string;
  size: string;
  gender: string;
  allRounds: number;
  currentRounds: number;
  monthlyTicket: [];
  dogAttendances: [];
  status: number;
}
