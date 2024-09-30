export interface IPastDogSchoolList {
  schoolName: string;
  schoolNumber: string;
  schoolAddress: string;
  dropOutDate: number[];
}

export interface ITicket {
  ticketType: string;
  allRoundTicket: number;
  currentRoundTicket: number;
  monthlyTicketNumber: number;
  ticketStartDate: number[];
  ticketExpirationDate: number[] | null;
  attendanceDays: string[];
  ticketHistory: string[];
}

export interface IMemberSchoolInfo {
  schoolId: number;
  schoolName: string;
  schoolNumber: string;
  ticket: ITicket;
  schoolAddress: string;
  registeredDate: number[];
  pastDogSchoolList?: IPastDogSchoolList[];
}
