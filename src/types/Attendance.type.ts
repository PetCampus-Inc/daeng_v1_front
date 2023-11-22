export interface IAttendanceInfo {
  data: IDogsList[];
  status: number;
}

export interface IAttendDogsInfo {
  data: IAttendDogLists[];
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
  monthlyTicket: [];
}

export interface IMemberCallInfo {
  data: {
    dogName: string;
    memberPhoneNumber: string;
  };
  status: number;
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

export interface IDeleteInfo {
  adminId: number;
  targetDogId: number;
}
