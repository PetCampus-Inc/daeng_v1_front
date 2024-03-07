import customAxios from "libs/CustomAxios";
import { ILoginInfo } from "types/Member.type";
import { IResponse } from "types/Response.type";

export const handleLoginResult = async (req: ILoginInfo): Promise<IResponse> => {
  const url = `member/login`;
  const { data } = await customAxios.post(url, req);
  return data.data;
};
