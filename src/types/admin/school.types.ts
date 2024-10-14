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

export interface MemberFormList {
  enrollmentFormId: number;
  memberName: string;
  dogName: string;
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
