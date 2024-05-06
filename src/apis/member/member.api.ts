import customAxios from "libs/CustomAxios";
import { IMemberInfo } from "types/member/home.types";
import { IResponse } from "types/Response.type";

export const handleLoginResult = async (): Promise<IResponse> => {
  const url = `oauth2/authorization/kakao`;
  const { data } = await customAxios.get(url);
  return data.data;
};

// 견주 정보
export const handleGetMemberInfo = async (memberId: number): Promise<IMemberInfo> => {
  const url = `/member/info`;
  const { data } = await customAxios.get(url, {
    params: {
      memberId
    }
  });
  return data.data;
};

// 견주의 강아지 리스트
export const handleGetMemberMainDogInfo = async (memberId: number): Promise<IMemberInfo> => {
  const url = `/member/member/main/dog`;
  const { data } = await customAxios.get(url, {
    params: {
      memberId
    }
  });
  return data.data;
};
