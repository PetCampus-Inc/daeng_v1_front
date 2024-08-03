import { format } from "date-fns";
import authAxios from "libs/AuthAxios";
import { request } from "libs/AuthAxios/request";

import type {
  AttendData,
  AttendReq,
  AttendanceData,
  DogInfoAgendaData,
  DogInfoDetailData,
  DogInfoRecordData,
  IMemberCallInfo,
  PrecautionData,
  NewTicketReq,
  TicketDetailData,
  NewTicketData
} from "types/admin/attendance.type";

export const handleGetSearchDogs = async (schoolId: number, searchText?: string) => {
  const url = `admin/attendance/dog/search`;
  const { data } = await request<AttendanceData[]>({
    url,
    params: {
      schoolId,
      searchText
    }
  });

  return data;
};

export const handleSortPayment = async (schoolId: number): Promise<AttendanceData[]> => {
  const url = `admin/attendance/dog/sort/payment?schoolId=${schoolId}`;
  const { data } = await request<AttendanceData[]>({ url });
  return data;
};

export const handleSortCharge = async (
  schoolId: number,
  adminId: number
): Promise<AttendanceData[]> => {
  const url = `admin/attendance/dog/sort/charge?schoolId=${schoolId}&adminId=${adminId}`;
  const { data } = await request<AttendanceData[]>({ url });
  return data;
};

export const handleSortDate = async (schoolId: number): Promise<AttendanceData[]> => {
  const url = `admin/attendance/dog/sort/date?schoolId=${schoolId}`;
  const { data } = await request<AttendanceData[]>({ url });
  return data;
};

export const handleCallMember = async (dogId: number): Promise<IMemberCallInfo> => {
  const url = `admin/attendance/callowner/${dogId}`;
  const { data } = await request<IMemberCallInfo>({ url });
  return data;
};

// TODO: API 인터페이스 변경될 예정
export const handleSendAlarm = async (dogId: number): Promise<AttendanceData[]> => {
  const url = `admin/attendance/send/alarm/${dogId}`;
  const { data } = await request<AttendanceData[]>({ url });
  return data;
};

export const handleDeleteDog = async (dogId: number) => {
  const url = `admin/attendance/delete/dog?dogId=${dogId}`;
  return await request({
    url,
    method: "POST"
  });
};

/**
 * @description 출석 기능 조회 - 해당 유치원내 출석안한 강아지들만 반환합니다.
 * @param {number} schoolId
 */
export const handleGetAttendDogs = async (schoolId: number): Promise<AttendData[]> => {
  const url = `admin/attendance/attend?schoolId=${schoolId}`;
  const { data } = await request<AttendData[]>({ url });
  return data;
};

/**
 * @description 출석 기능 강아지 검색 - 이용권이 유효하고 출석안한 강아지중에서 강아지를 검색합니다.
 * @param {number} schoolId
 * @param {string?} searchText
 */
export const handleGetAttendSearchDogs = async (
  schoolId: number,
  searchText?: string
): Promise<AttendData[]> => {
  const url = `admin/attendance/attend/search?schoolId=${schoolId}&searchText=${
    searchText && searchText
  }`;
  const { data } = await request<AttendData[]>({ url });
  return data;
};

/**
 * @description 출석 기능 - 등원한 강아지를 출석체크 합니다.
 * @param {AttendReq} req
 */
export const handlePostAttend = async (req: AttendReq) => {
  const url = `admin/attendance/attend`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      schoolId: req.schoolId,
      adminId: req.adminId,
      attendanceIdList: req.attendanceIdList
    }
  });
};

// 강아지 상세 - 강아지 상세 정보
export const handleGetDogDetail = async (dogId: number) => {
  const url = `admin/attendance/dog/info`;
  const { data } = await request<DogInfoDetailData>({
    url,
    params: { dogId }
  });
  return data;
};

// 강아지 상세 - 메모 수정
export const handlePostDogMemo = async (dogId: number, memo: string): Promise<void> => {
  const url = `admin/attendance/dog/info/memo`;
  const { data } = await authAxios.post(url, {
    dogId,
    memo
  });
  return data;
};

// 강아지 상세 - 등원 기록
export const handleGetDogInfoRecord = async (dogId: number, date?: string) => {
  const url = `admin/attendance/dog/info/record`;
  const { data } = await request<DogInfoRecordData[]>({
    url,
    params: {
      dogId,
      date: date || format(new Date(), "yyyy-MM-dd")
    }
  });
  return data;
};

// 강아지 상세 - 알림장
export const handleGetDogInfoAgenda = async (dogId: number, date?: string) => {
  const url = `admin/attendance/dog/info/agenda`;
  const { data } = await request<DogInfoAgendaData>({
    url,
    params: {
      dogId,
      date: date || format(new Date(), "yyyy-MM-dd")
    }
  });
  return data;
};

// 강아지 상세 - 이용권 정보
export const handleGetTicketDetail = async (dogId: number) => {
  const url = `admin/attendance/dog/ticket/info`;
  const { data } = await request<TicketDetailData>({
    url,
    params: {
      dogId
    }
  });
  return data;
};

// 강아지 상세 - 이용권 갱신 정보
export const handleGetNewTicket = async (schoolId: number) => {
  const url = `admin/attendance/dog/ticket`;
  const { data } = await request<NewTicketData>({
    url,
    params: {
      schoolId
    }
  });
  return data;
};

// 강아지 상세 - 이용권 갱신
export const handlePostNewTicket = async (req: NewTicketReq) => {
  const url = `admin/attendance/dog/ticket`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      dogId: req.dogId,
      startDate: req.startDate,
      ticketType: req.ticketType,
      roundTicketNumber: req.roundTicketNumber,
      monthlyTicketNumber: req.monthlyTicketNumber,
      attendanceDays: req.attendanceDays
    }
  });
};

// 강아지 상세 - 유의사항
export const handleGetPrecautions = async (dogId: number) => {
  const url = `admin/attendance/dog/precautions`;
  const { data } = await request<PrecautionData>({
    url,
    params: {
      dogId
    }
  });
  return data;
};
