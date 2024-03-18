import { request } from "libs/CustomAxios/request";
import { ICareDogInfo, ICareDogProps } from "types/admin.caredog.type";
import { IResponse } from "types/helper.type";

export const handleGetCareDogs = async (adminId: number): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care?adminId=${adminId}`;
  const { data } = await request<IResponse<ICareDogInfo[]>>({ url });
  return data;
};

export const handleGetNewCareDogs = async (adminId: number): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care/add?adminId=${adminId}`;
  const { data } = await request<IResponse<ICareDogInfo[]>>({ url });
  return data;
};

export const handleCreateCareDogs = async (req: ICareDogProps): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care/add`;
  const { data } = await request<IResponse<ICareDogInfo[]>>({
    url,
    method: "POST",
    data: {
      adminId: req.adminId,
      attendanceIdList: req.selectedDogId
    }
  });
  return data;
};

export const handleDeleteCareDogs = async (req: ICareDogProps): Promise<void> => {
  const url = `admin/attendance/care/delete`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      adminId: req.adminId,
      attendanceIdList: req.selectedDogId
    }
  });
};
