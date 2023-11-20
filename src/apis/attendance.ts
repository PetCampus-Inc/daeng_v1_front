import customAxios from "libs/CustomAxios";
import {
  IAdminInfo,
  IMemberCallInfo,
  ISearchDogs,
} from "types/Attendance.type";

export const handleGetDogs = async (adminId: number): Promise<IAdminInfo> => {
  const url: string = `admin/attendance?adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleGetSearchDogs = async (
  schoolId: number,
  searchText: string
): Promise<ISearchDogs> => {
  const url: string = `admin/attendance/dog/search?schoolId=${schoolId}&searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortRegistered = async (
  adminId: number
): Promise<ISearchDogs> => {
  const url: string = `admin/attendance/dog/sort/registered?adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortPayment = async (
  schoolId: number
): Promise<ISearchDogs> => {
  const url: string = `admin/attendance/dog/sort/payment?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortCharge = async (
  schoolId: number,
  adminId: number
): Promise<ISearchDogs> => {
  const url: string = `admin/attendance/dog/sort/charge?schoolId=${schoolId}&adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortDate = async (
  schoolId: number
): Promise<ISearchDogs> => {
  const url: string = `admin/attendance/dog/sort/date?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleCallMember = async (
  dogId: number
): Promise<IMemberCallInfo> => {
  const url: string = `admin/attendance/callowner/${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSendAlarm = async (dogId: number) => {
  const url: string = `admin/attendance/send/alarm/${dogId}`;
  const { data } = await customAxios.get(url);
  return data;
};
