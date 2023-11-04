import customAxios from "libs/CustomAxios";
import { IResponse } from "types/Response.type";
import { ILoginInfo } from "types/Member.type";

export const handleLoginResult = async (
  req: ILoginInfo
): Promise<IResponse> => {
  const url: string = `member/login`;
  const { data } = await customAxios.post(url, req);
  return data.data;
};
