import customAxios from "libs/CustomAxios";
import { IMemberInfo, IMemberProfileInfo, IMemberProfilePostInfo } from "types/member/home.types";
import { IResponse } from "types/Response.type";

export const handleLoginResult = async (): Promise<IResponse> => {
  const url = `oauth2/authorization/kakao`;
  const { data } = await customAxios.get(url);
  return data.data;
};

// 견주 정보
export const handleGetMemberInfo = async (memberId: string): Promise<IMemberInfo> => {
  const url = `/member/mypage`;
  const { data } = await customAxios.get(url, {
    params: {
      memberId
    }
  });
  return data.data;
};

// 견주 상세 정보
export const handleGetMemberProfileInfo = async (memberId: string): Promise<IMemberProfileInfo> => {
  const url = `/member/info`;
  const { data } = await customAxios.get(url, {
    params: {
      memberId
    }
  });
  return data.data;
};

// 견주 상세 정보 수정
export const handleMemberInfoResult = async (
  req: IMemberProfilePostInfo
): Promise<IMemberProfilePostInfo> => {
  const url = `/member/info`;
  const { data } = await customAxios.post(url, {
    memberId: req.memberId,
    memberName: req.memberName,
    memberGender: req.memberGender,
    memberProfileUri: req.memberProfileUri,
    nickName: req.nickName,
    address: req.address,
    addressDetail: req.addressDetail,
    phoneNumber: req.phoneNumber,
    emergencyPhoneNumber: req.emergencyPhoneNumber,
    relation: req.relation
  });

  console.log("data", data);
  return data;
};
