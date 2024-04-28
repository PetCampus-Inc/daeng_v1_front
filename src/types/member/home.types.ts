export type TAttendanceStatus = "ATTENDED" | "NOT_ATTENDED";
export type TAgendaStatus = "COMPLETE" | "NOT_YET" | "WRITING";
export type TImageType = "IMAGE" | "PROFILE";

export interface IHome {
  dogId: number;
  dogName: string;
  memberId: number;
  relation: string;
  attendanceStatus: TAttendanceStatus;
  attendanceDate: string;
  todayAgendaStatus: TAgendaStatus;
  imageList: ImageList[][];
}

export interface ImageList {
  imageId: number;
  imageUri: string;
  imageType: TImageType;
  comment?: string;
  createdTime: string;
}
