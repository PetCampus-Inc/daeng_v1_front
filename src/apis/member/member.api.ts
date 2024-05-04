import customAxios from "libs/CustomAxios";
import { IResponse } from "types/Response.type";

export const handleLoginResult = async (): Promise<IResponse> => {
  const url = `oauth2/authorization/kakao`;
  const { data } = await customAxios.get(url);
  return data.data;
};

// 견주 정보
export const handleGetMemberInfo = async (memberId: number): Promise<IResponse> => {
  const url = `/member/info`;
  const { data } = await customAxios.get(url, {
    params: {
      memberId
    }
  });
  return data.data;
};
