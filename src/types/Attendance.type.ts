export interface IAdminInfo {
  data: {
    adminName: string;
    role: string;
    dogs: [
      {
        dogId: number;
        dogName: string;
        allRounds: number;
        currentRounds: number;
      },
    ];
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

export interface ISortResponse {
  dogs: [
    {
      dogId: number;
      dogName: string;
      allRounds: number;
      currentRounds: number;
    },
  ];
  status: number;
}
