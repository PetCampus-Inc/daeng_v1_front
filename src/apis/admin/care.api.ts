import { request } from "libs/AuthAxios/request";
import {
  ICareDogInfo,
  ICareDogProps,
  ICareTempSave,
  IPastAgenda,
  IReqGallery
} from "types/admin/care.types";

export const handleGetCareDogs = async (adminId: number): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care?adminId=${adminId}`;
  const { data } = await request<ICareDogInfo[]>({ url });
  return data;
};

export const handleGetNewCareDogs = async (adminId: number): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care/add?adminId=${adminId}`;
  const { data } = await request<ICareDogInfo[]>({ url });
  return data;
};

export const handleCreateCareDogs = async (req: ICareDogProps): Promise<ICareDogInfo[]> => {
  const url = `admin/attendance/care/add`;
  const { data } = await request<ICareDogInfo[]>({
    url,
    method: "POST",
    data: {
      adminId: req.adminId,
      attendanceIdList: req.selectedDogId
    }
  });
  return data;
};

export const handleDeleteCareDogs = async (req: ICareDogProps) => {
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

// 알림장 임시저장
export const handleTempSaveCareDog = async (req: ICareTempSave) => {
  const url = "school/agenda/tempsave";
  return await request<void>({
    url,
    method: "POST",
    data: {
      agendaId: req.agendaId,
      adminId: req.adminId,
      dogId: req.dogId,
      agendaNote: req.agendaNote,
      snack: req.snack,
      poop: req.poop,
      poopMemo: req.poopMemo
    }
  });
};

// 알림장 가져오기
export const handleGetAgenda = async (dogId: number): Promise<IPastAgenda> => {
  const url = `school/agenda?dogId=${dogId}`;
  const { data } = await request<IPastAgenda>({ url });
  return data;
};

// 알림장 전송
export const handleSendAgenda = async (req: ICareTempSave) => {
  const url = "school/agenda/send";
  return await request<void>({
    url,
    method: "POST",
    data: {
      agendaId: req.agendaId,
      adminId: req.adminId,
      dogId: req.dogId,
      agendaNote: req.agendaNote,
      snack: req.snack,
      poop: req.poop,
      poopMemo: req.poopMemo
    }
  });
};

// 지난 알림장 가져오기
export const handleGetPastAgenda = async (dogId: number): Promise<IPastAgenda[]> => {
  const url = `school/agenda/past?dogId=${dogId}`;
  const { data } = await request<IPastAgenda[]>({ url });
  return data;
};

export const handlePostAlbum = async (req: IReqGallery) => {
  const url = `admin/attendance/dog/image`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      dogIdList: req.dogIdList,
      imageUriList: req.imageUriList,
      comment: req.comment
    }
  });
};
