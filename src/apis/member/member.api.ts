import customAxios from "libs/CustomAxios";
import { IMainAlbum } from "types/member/home.types";
import { IResponse } from "types/Response.type";

export const handleLoginResult = async (): Promise<IResponse> => {
  const url = `oauth2/authorization/kakao`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleGetMainAlbum = async (req: IMainAlbum) => {
  const url = `member/main/album?dogId=${req.dogId}`;
  const { data } = await customAxios.get(url, {
    params: {
      date: req.date
    }
  });
  return data.data;
};
