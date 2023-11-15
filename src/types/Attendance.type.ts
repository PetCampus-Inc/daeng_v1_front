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
