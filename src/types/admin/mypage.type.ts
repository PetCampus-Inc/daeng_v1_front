export interface IOwnerInfo {
  adminName: string;
  phoneNumber: string;
  id: string;
  role: string;
  imageUrl: string;
  schoolId: number;
  schoolName: string;
  schoolNumber: string;
  address: string;
  registrationNumber: string;
  registeredDate: number[];
}
export interface ITeacherInfo {
  adminName: string;
  schoolId: number;
  schoolName: string;
  phoneNumber: string;
  schoolNumber: string;
  schoolAddress: string;
  enrollDate: number[];
  resignedDate: number[];
  school: {
    schoolId: number;
    name: string;
    phoneNumber: string;
    address: string;
  };
}

export interface ISchoolCallInfo {
  schoolName: string | undefined;
  schoolNumber: string | undefined;
}
