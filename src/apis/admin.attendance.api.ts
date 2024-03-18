import { format } from "date-fns";
import customAxios from "libs/CustomAxios";
import { request } from "libs/CustomAxios/request";
import {
  IAttendDogInfo,
  IMemberCallInfo,
  IPrecautionInfo,
  ITicketDetail
} from "types/admin.attendance.type";
import { IResponse } from "types/helper.type";

export const handleGetSearchDogs = async (
  schoolId: number,
  searchText?: string
): Promise<IAttendDogInfo[]> => {
  const params = new URLSearchParams();
  params.append("schoolId", schoolId.toString());
  if (searchText) {
    params.append("searchText", searchText);
  }
  const url = `admin/attendance/dog/search?${params.toString()}`;
  const { data } = await request<IResponse<IAttendDogInfo[]>>({ url });

  return data;
};

export const handleSortPayment = async (schoolId: number): Promise<IAttendDogInfo[]> => {
  const url = `admin/attendance/dog/sort/payment?schoolId=${schoolId}`;
  const { data } = await request<IResponse<IAttendDogInfo[]>>({ url });
  return data;
};

export const handleSortCharge = async (
  schoolId: number,
  adminId: number
): Promise<IAttendDogInfo[]> => {
  const url = `admin/attendance/dog/sort/charge?schoolId=${schoolId}&adminId=${adminId}`;
  const { data } = await request<IResponse<IAttendDogInfo[]>>({ url });
  return data;
};

export const handleSortDate = async (schoolId: number): Promise<IAttendDogInfo[]> => {
  const url = `admin/attendance/dog/sort/date?schoolId=${schoolId}`;
  const { data } = await request<IResponse<IAttendDogInfo[]>>({ url });
  return data;
};

export const handleCallMember = async (dogId: number): Promise<IMemberCallInfo> => {
  const url = `admin/attendance/callowner/${dogId}`;
  const { data } = await request<IResponse<IMemberCallInfo>>({ url });
  return data;
};

// TODO: API 인터페이스 변경될 예정
export const handleSendAlarm = async (dogId: number): Promise<IAttendDogInfo[]> => {
  const url = `admin/attendance/send/alarm/${dogId}`;
  const { data } = await request<IResponse<IAttendDogInfo[]>>({ url });
  return data;
};

export const handleDeleteDog = async (dogId: number): Promise<void> => {
  const url = `admin/attendance/delete/dog?dogId=${dogId}`;
  return await request<void>({
    url,
    method: "POST"
  });
};

interface IAttendInfoProps {
  schoolId: number;
  selectedDogIds: number[];
}

export const handleGetAttendSearchDogs = async (
  schoolId: number,
  searchText?: string
): Promise<IAttendDogInfo[]> => {
  const url = `admin/attendance/attend/search?schoolId=${schoolId}&searchText=${searchText && searchText}`;
  const { data } = await request<IResponse<IAttendDogInfo[]>>({ url });
  return data;
};

export const handlePostAttend = async (req: IAttendInfoProps): Promise<void> => {
  const url = `admin/attendance/attend`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      schoolId: req.schoolId,
      attendanceIdList: req.selectedDogIds
    }
  });
};

// 강아지 상세 - 강아지 상세 정보
export const handleGetDogAndMemberDetails = async (dogId: number): Promise<any> => {
  const url = `admin/attendance/dog/info?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};

// 강아지 상세 - 메모 수정
export const handlePostDogMemo = async (dogId: number, memo: string): Promise<void> => {
  const url = `admin/attendance/dog/info/memo`;
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
  const url = `admin/attendance/dog/info/attendance`;
  const { data } = await customAxios.get(url, {
    params: {
      dogId,
      calendar: calendar || format(new Date(), "yyyy-MM-dd")
    }
  });
  return data.data;
};

// 강아지 상세 - 이용권 상세정보
export const handleGetTicketDetail = async (dogId: number): Promise<ITicketDetail> => {
  const url = `admin/attendance/dog/ticket?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

// 연결 전
export const handlePostTicket = async (req: any): Promise<any> => {
  const url = `admin/attendance/dog/ticket`;
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

// 강아지 상세 - 유의사항
export const handleGetPrecautions = async (dogId: number): Promise<IPrecautionInfo> => {
  const url = `admin/attendance/dog/precautions?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};
