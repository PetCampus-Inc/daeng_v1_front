export interface IAdminLoginInfo {
  inputId: string;
  inputPw: string;
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
