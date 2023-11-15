import customAxios from "libs/CustomAxios";
import { IAdminInfo } from "types/Attendance.type";

export const handleGetDogs = async (adminId: number): Promise<IAdminInfo> => {
  const url: string = `admin/attendance?adminId=${adminId}`;
  const { data } = await customAxios.get(url);
  return data;
};
