import customAxios from "libs/CustomAxios";
import {
  IAttendCareDogInfo,
  IAttendCareInfo,
  IAttendDogLists,
  IAttendDogsInfo,
  IAttendInfo,
  IAttendanceInfo,
  IDogDetails,
  IMemberCallInfo
} from "types/Attendance.type";
import { IResponse } from "types/Response.type";

export const handleGetDogs = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleGetSearchDogs = async (
  schoolId: number,
  searchText: string
): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/search?schoolId=${schoolId}&searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleSortRegistered = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/registered?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleSortPayment = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/payment?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleSortCharge = async (
  schoolId: number,
  adminId: number
): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/charge?schoolId=${schoolId}&adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleSortDate = async (schoolId: number): Promise<IAttendanceInfo> => {
  const url: string = `admin/attendance/dog/sort/date?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleCallMember = async (dogId: number): Promise<IMemberCallInfo> => {
  const url: string = `admin/attendance/callowner/${dogId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleSendAlarm = async (dogId: number) => {
  const url: string = `admin/attendance/send/alarm/${dogId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleDeleteDog = async (dogId: number): Promise<IResponse> => {
  const url: string = `admin/attendance/delete/dog?dogId=${dogId}`;
  const { data } = await customAxios.post(url);
  return data.data;
};

export const handlePostAttend = async (req: IAttendInfo): Promise<IResponse> => {
  const url: string = `admin/attendance/attend`;
  const { data } = await customAxios.post(url, {
    schoolId: req.schoolId,
    attendanceIdList: req.selectedDogIds
  });
  return data;
};

export const handleGetAttendDogs = async (schoolId: number): Promise<IAttendDogsInfo> => {
  const url: string = `admin/attendance/attend?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleGetAttendSearchDogs = async (
  schoolId: number,
  searchText: string
): Promise<IAttendDogLists[]> => {
  const url: string = `admin/attendance/attend/search?schoolId=${schoolId}&searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data.data;
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

export const handleGetDogDetails = async (dogId: number, date: string): Promise<IDogDetails> => {
  const url: string = `admin/attendance/dog/info?dogId=${dogId}&date=${date}`;
  const { data } = await customAxios.get(url);
  return data;
};
