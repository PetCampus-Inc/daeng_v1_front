import customAxios from "libs/CustomAxios";
import { IAdminInfo, ISearchDogs, ISortResponse } from "types/Attendance.type";

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
): Promise<ISortResponse> => {
  const url: string = `admin/attendance/dog/sort/registered?adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortPayment = async (
  schoolId: number
): Promise<ISortResponse> => {
  const url: string = `admin/attendance/dog/sort/payment?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortCharge = async (
  schoolId: number,
  adminId: number
): Promise<ISortResponse> => {
  const url: string = `admin/attendance/dog/sort/charge?schoolId=${schoolId}&adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data;
};

export const handleSortDate = async (
  schoolId: number
): Promise<ISortResponse> => {
  const url: string = `admin/attendance/dog/sort/date?schoolId=${schoolId}`;
  const { data } = await customAxios.get(url);
  return data;
};
