import customAxios from "libs/CustomAxios";
import { request } from "libs/CustomAxios/request";
import { IPrecautionInfo } from "types/admin/attendance.type";

import type { Response } from "types/helper.types";
import type {
  DogsDataType,
  HomeDataType,
  ImageList,
  IMainAlbum,
  IMemberDogSchoolInfo,
  IMemberInfo,
  IMemberProfile,
  IMemberProfileInfo,
  IMemberProfilePostInfo,
  MemberDogInfoData,
  MemberDogInfoReq
} from "types/member/main.types";

// 견주 홈 - 메인
export const handleGetHomeInfo = async (memberId: number, dogId: number): Promise<HomeDataType> => {
  const url = `/member/main`;
  const { data } = await request<Response<HomeDataType>>({
    url,
    params: {
      memberId,
      dogId
    }
  });

  return data;
};

// 견주 홈 - 강아지 리스트
export const handleGetDogs = async (memberId: number): Promise<DogsDataType[]> => {
  const url = `/member/main/dogs`;
  const { data } = await request<Response<DogsDataType[]>>({
    url,
    params: { memberId }
  });
  return data;
};

// 견주 홈 - 사진앨범
export const handleGetAlbum = async (req: IMainAlbum): Promise<ImageList[][]> => {
  const url = `/member/main/album`;
  const { data } = await request<Response<ImageList[][]>>({
    url,
    params: {
      dogId: req.dogId,
      date: req.date
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

// 견주 홈 - 강아지 상세 정보
export const handleGetMemberDogDetailInfo = async (dogId: number): Promise<MemberDogInfoData> => {
  const url = `/member/dog/info`;
  const { data } = await request<Response<MemberDogInfoData>>({
    url,
    params: {
      dogId
    }
  });
  return data;
};

// 견주 홈 - 강아지 상세 정보 수정
export const handlePostMemberDogDetailInfo = async (req: MemberDogInfoReq): Promise<void> => {
  const url = `/member/dog/info`;
  return await request<void>({
    url,
    method: "POST",
    data: {
      dogId: req.dogId,
      dogName: req.dogName,
      dogGender: req.dogGender,
      dogSize: req.dogSize,
      breedId: req.breedId,
      newBreed: req.newBreed,
      profileUri: req.profileUri,
      birthDate: req.birthDate,
      neutralization: req.neutralization
    }
  });
};

// 강아지의 알러지/질병 내용 수정
export const handlePostMemoDogAllergy = async (dogId: number, memo: string): Promise<void> => {
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

// 강아지 유치원 정보
export const handleGetMemberDogSchool = async (dogId: number): Promise<IMemberDogSchoolInfo> => {
  const url = `member/dog/school?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data.data.school;
};

// 강아지 유의사항 동의 정보
export const handleGetMemberDogPrecaution = async (dogId: number): Promise<IPrecautionInfo> => {
  const url = `member/dog/school?dogId=${dogId}`;
  const { data } = await customAxios.get(url);
  return data.data.precaution;
};

// 멤버 유의사항 상세 내용
export const handleGetMemberAgreement = async (schoolId: number, agreementId: number) => {
  const url = `member/agreement?schoolId=${schoolId}&agreementId=${agreementId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

//멤버 유의사항 재동의
export const handlePostMemberAgreement = async (
  dogId: number,
  agreementId: number
): Promise<void> => {
  const url = `member/agreement?dogId=${dogId}&agreementId=${agreementId}`;
  return await customAxios.post(url);
};

// 회원 가입승인후 초기 견주, 강아지 프로필 설정 데이터 조회
export const handleGetMemberProfile = async (memberId: number) => {
  const url = `member/main/profile?memberId=${memberId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

// 회원 가입승인후 초기 견주, 강아지 프로필 설정
export const handlePostMemberProfile = async (req: IMemberProfile): Promise<void> => {
  const url = `member/main/profile`;
  const { data } = await customAxios.post(url, {
    memberId: req.memberId,
    dogId: req.dogId,
    memberProfileUri: req.memberProfileUri,
    dogProfileUri: req.dogProfileUri,
    nickName: req.nickName,
    relation: req.relation
  });
  return data;
};
