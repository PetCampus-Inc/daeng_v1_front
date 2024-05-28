export interface IAdminLoginInfo {
  inputId: string;
  inputPw: string;
  fcmToken: string;
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
