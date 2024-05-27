import customAxios from "libs/CustomAxios";
import { request } from "libs/CustomAxios/request";
import { IResponse } from "types/helper.type";

import type {
  IMemberInfo,
  IMemberProfileInfo,
  IMemberProfilePostInfo,
  IMainAlbum,
  IMemberDogInfo,
  IMemberDogPostDetailInfo,
  HomeDataType,
  IDogVaccination
} from "types/member/home.types";

// 견주 홈 메인
export const handleGetHomeInfo = async (memberId: number, dogId: number): Promise<HomeDataType> => {
  const url = `/member/main`;
  const { data } = await request<IResponse<HomeDataType>>({
    url,
    params: {
      memberId,
      dogId
    }
  });

  return data;
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

export const handleGetMainAlbum = async (req: IMainAlbum) => {
  const url = `member/main/album?dogId=${req.dogId}`;
  const { data } = await customAxios.get(url, {
    params: {
      date: req.date
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

// 승인 대기 중 가입신청서 승인 취소 (강아지 추가 취소)
export const handlePostMemberDogEnrollment = async (enrollmentFormId: string): Promise<void> => {
  const url = `/member/cancel/enrollmentForm?enrollmentFormId=${enrollmentFormId}`;
  return await customAxios.post(url);
};

// 강아지 삭제하기
export const handlePostMemberDogDelete = async (memberId: string, dogId: string): Promise<void> => {
  const url = `/member/delete/dog?memberId=${memberId}&dogId=${dogId}`;
  return await customAxios.post(url);
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

// 강아지 상세 정보
export const handleGetMemberDogDetailInfo = async (dogId: number): Promise<IMemberDogInfo> => {
  const url = `/member/dog/info`;
  const { data } = await customAxios.get(url, {
    params: {
      dogId
    }
  });
  return data.data;
};

// 강아지 상세 정보 수정
export const handlePostMemberDogDetailInfo = async (
  req: IMemberDogPostDetailInfo
): Promise<IMemberDogPostDetailInfo> => {
  const url = `/member/dog/info`;
  const { data } = await customAxios.post(url, {
    dogId: req.dogId,
    dogName: req.dogName,
    dogGender: req.dogGender,
    dogSize: req.dogSize,
    breedId: req.breedId,
    newBreed: req.newBreed,
    birthDate: req.birthDate,
    neutralization: req.neutralization
  });
  return data;
};

// 강아지의 알러지/질병 내용 수정
export const handlePostMemoDogAlleray = async (dogId: number, memo: string): Promise<void> => {
  const url = `/member/dog/allergy`;
  const { data } = await customAxios.post(url, {
    dogId: dogId,
    memo: memo
  });
  return data;
};

// 강아지의 픽드랍 메모 수정
export const handlePostMemoDogPickdrop = async (dogId: number, memo: string): Promise<void> => {
  const url = `/member/dog/pickdrop`;
  const { data } = await customAxios.post(url, {
    dogId: dogId,
    memo: memo
  });
  return data;
};

// 강아지 예방 접종 파일 추가 업로드
export const handlePostMemoDogVaccination = async (
  req: IDogVaccination
): Promise<IDogVaccination> => {
  const url = `/member/vaccination`;
  const { data } = await customAxios.post(url, {
    dogIdList: req.dogIdList,
    imageUriList: req.imageUriList,
    comment: req.comment
  });
  return data;
};
