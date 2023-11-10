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
  userId: string;
  userPw: string;
  schoolId: number;
  userName: string;
  userPhone: string;
}

export interface ITeacherApprove {
  adminId: number;
  schoolId: number;
}
