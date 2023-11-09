export interface IAdminLoginInfo {
  inputId: string;
  inputPw: string;
}

export interface IOwnerSignUpInfo {
  userId: string;
  userPw: string;
  userName: string;
  userPhone: string;
  schoolName: string;
  schoolPhone: string;
  schoolAddress: string;
  schoolNum: string;
}

export interface ITeacherSignUpInfo {
  id: string;
  pwd: string;
  schoolId: number;
  name: string;
  phoneNumber: string;
}
