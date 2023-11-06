export interface IAdminLoginInfo {
  id: string;
  pwd: string;
}

export interface IOwnerSignUpInfo {
  id: string;
  pwd: string;
  name: string;
  phoneNumber: string;
  schoolName: string;
  schoolPhoneNumber: string;
  schoolAddress: string;
  registrationNumber: string;
}

export interface ITeacherSignUpInfo {
  id: string;
  pwd: string;
  schoolId: number;
  name: string;
  phoneNumber: string;
}
