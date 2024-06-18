export interface ISchoolInfo {
  schoolId: number;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface IBreedInfo {
  data: {
    breedId: number;
    breedName: string;
  }[];
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
