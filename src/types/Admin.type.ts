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
  submittedAdminId: number;
  submittedSchoolId: number;
}

export interface ISimpleEnrollmentFormList {
  enrollmentFormId: number;
  memberName: string;
  dogName: string;
}

export interface ISimpleSchoolFormList {
  schoolFormId: number;
  schoolFormName: string;
  createdDate: number[];
}

export interface INewEnrollmentList {
  simpleEnrollmentFormList: ISimpleEnrollmentFormList[];
  simpleSchoolFormList: ISimpleSchoolFormList[];
}

export interface ITeacherInfo {
  adminId: number;
  phoneNumber: string;
  teacherName: string;
}
export interface ITeacherList {
  teacherList: ITeacherInfo[];
  pendingList: ITeacherInfo[];
}

export interface IWaitingOwnerInfo {
  enrollmentFormId: number;
  memberName: string;
  dogName: string;
}
