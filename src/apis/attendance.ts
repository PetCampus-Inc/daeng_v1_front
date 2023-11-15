import customAxios from "libs/CustomAxios";
import { IAdminInfo, ISearchDogs } from "types/Attendance.type";

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
