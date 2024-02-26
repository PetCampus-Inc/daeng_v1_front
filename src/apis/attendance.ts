import { format } from "date-fns";
import customAxios from "libs/CustomAxios";
import {
  IAttendCareDogInfo,
  IAttendCareInfo,
  IAttendDogsInfo,
  IAttendInfo,
  IAttendSearchInfo,
  IAttendanceInfo,
  IDeleteInfo,
  IMemberCallInfo
} from "types/Attendance.type";
import { IResponse } from "types/Response.type";

export const handleGetDogs = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleGetSearchDogs = async (
  schoolId: number,
  searchText: string
): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/search?schoolId=${schoolId}&searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortRegistered = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/registered?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortPayment = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/payment?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortCharge = async (
  schoolId: number,
  adminId: number
): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/charge?schoolId=${schoolId}&adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortDate = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/date?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleCallMember = async (dogId: number): Promise<IMemberCallInfo> => {
  const url: string = `admin/attendance/callowner/${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSendAlarm = async (dogId: number) => {
  const url: string = `admin/attendance/send/alarm/${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleDeleteDog = async (req: IDeleteInfo): Promise<IResponse> => {
  const url: string = `admin/attendance/delete/dog`;
  const { data } = await customAxios.post(url, {
    adminId: req.adminId,
    dogId: req.targetDogId
  });
  return data;
};

export const handleGetAttendDogs = async (schoolId: number): Promise<IAttendDogsInfo> => {
  const url: string = `admin/attendance/attend?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handlePostAttend = async (req: IAttendInfo): Promise<IResponse> => {
  const url: string = `admin/attendance/attend`;
  const { data } = await customAxios.post(url, {
    schoolId: req.schoolId,
    attendanceIdList: req.selectedDogIds
  });
  return data;
};

export const handleGetAttendSearchDogs = async (
  schoolId: number,
  searchText: string
): Promise<IAttendSearchInfo> => {
  const url: string = `admin/attendance/attend/dog/search?schoolId=${schoolId}&searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleGetAttendCareDogs = async (schoolId: number): Promise<IAttendCareDogInfo> => {
  const url: string = `admin/attendance/attend/dog/care?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handlePostAttendCareDogs = async (req: IAttendCareInfo): Promise<IResponse> => {
  const url: string = `admin/attendance/attend/dog/care`;
  const { data } = await customAxios.post(url, {
    adminId: req.adminId,
    attendanceIdList: req.selectedDogId
  });
  return data;
};

// 강아지 상세 - 강아지 상세 정보
export const handleGetDogAndMemberDetails = async (dogId: number): Promise<any> => {
  const url: string = `admin/attendance/dog/info?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};

// 강아지 상세 - 메모 수정
export const handlePostDogMemo = async (dogId: number, memo: string): Promise<IResponse> => {
  const url: string = `admin/attendance/dog/info/memo`;
  const { data } = await customAxios.post(url, {
    dogId,
    memo
  });
  return data;
};

// 강아지 상세 - 등원 기록
// FIXME: 백엔드 api 수정 완료 시 response any 타입 수정 필요
export const handleGetAttendanceHistory = async (
  dogId: number,
  calendar?: string
): Promise<any> => {
  const url: string = `admin/attendance/dog/info/attendance`;
  const { data } = await customAxios.get(url, {
    params: {
      dogId,
      calendar: calendar || format(new Date(), "yyyy-MM-dd")
    }
  });
  return data.data;
};

// 연결 전
export const handleGetTicketDetail = async (dogId: number): Promise<any> => {
  const url: string = `admin/attendance/dog/ticket?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};

// 연결 전
export const handlePostTicket = async (req: any): Promise<any> => {
  const url: string = `admin/attendance/dog/ticket`;
  const { data } = await customAxios.post(url, {
    dogId: req.dogId,
    startDate: req.startDate,
    ticketType: req.ticketType,
    roundTicketNumber: req.roundTicketNumber,
    monthlyTicketNumber: req.monthlyTicketNumber,
    attendanceDays: req.attendanceDays
  });
  return data;
};

// 연결 전
export const handleGetPrecautions = async (dogId: number): Promise<any> => {
  const url: string = `admin/attendance/dog/precautions?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};
