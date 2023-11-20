export interface IAdminInfo {
  data: {
    adminName: string;
    role: string;
    dogs: IDogsList[];
  };
  status: number;
}

export interface IAdminLoginResponse {
  data: {
    adminId: number;
    adminName: string;
    role: string;
  };
  status: number;
}

export interface ISearchDogs {
  data: [
    {
      dogId: number;
      dogName: string;
      allRounds: number;
      currentRounds: number;
    },
  ];
  status: number;
}

export interface IDogsList {
  dogId: number;
  dogName: string;
  allRounds: number;
  currentRounds: number;
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
