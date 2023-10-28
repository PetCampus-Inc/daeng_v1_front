import customAxios from "libs/CustomAxios";
import { IResponse } from "types/Response.type";
import { ILoginInfo } from "types/User.type";

export const handleLoginResult = async (
  req: ILoginInfo
): Promise<IResponse> => {
  const url: string = `user/login`;
  const { data } = await customAxios.post(url, req);
  return data.data;
};
