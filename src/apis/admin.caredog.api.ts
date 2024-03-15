import { request } from "libs/CustomAxios/request";
import { ICareDogInfo, ICareDogProps } from "types/admin.caredog.type";

export const handleGetCareDogs = async (schoolId: number): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care/add?adminId=${schoolId}`;
  return await request<ICareDogInfo[]>({ url });
};

export const handleAddCareDogs = async (req: ICareDogProps): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care/add`;
  return await request<ICareDogInfo[]>({
    url,
    method: "POST",
    params: {
      adminId: req.adminId,
      attendanceIdList: req.selectedDogId
    }
  });
};

export const handleDeleteCareDogs = async (req: ICareDogProps): Promise<void> => {
  const url = `admin/attendance/care/delete`;
  return await request<void>({
    url,
    method: "DELETE",
    params: {
      adminId: req.adminId,
      attendanceIdList: req.selectedDogId
    }
  });
};
