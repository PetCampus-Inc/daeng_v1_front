export interface IAttendanceInfo {
  data: IDogsList[];
  status: number;
}

export interface IAdminLoginResponse {
  data: {
    adminId: number;
    adminName: string;
    schoolId: number;
    role: string;
  };
  status: number;
}

// export interface ISearchDogs {
//   data: [
//     {
//       dogId: number;
//       dogName: string;
//       allRounds: number;
//       currentRounds: number;

//     },
//   ];
//   status: number;
// }

export interface IDogsList {
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
