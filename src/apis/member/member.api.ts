import authAxios from "libs/AuthAxios";
import { request } from "libs/AuthAxios/request";
import { PrecautionData } from "types/admin/attendance.type";
import { MemberAuthData, SocialAuthData } from "types/member/auth.types";
import { ApiResponse } from "types/Response.type";

import type {
  DogsDataType,
  HomeDataType,
  ImageList,
  IMemberDogSchoolInfo,
  IMemberInfo,
  IMemberProfile,
  IMemberProfileInfo,
  IMemberProfilePostInfo,
  DogVaccination,
  MemberDogInfoData,
  MemberDogInfoReq,
  DogProfileReq
} from "types/member/main.types";

// 멤버 로그인
export const postMemberLogin = async (
  req: SocialAuthData
): Promise<{ data: MemberAuthData; accessToken: string }> => {
  const url = `member/firebase/login`;

  const response = await authAxios.post<ApiResponse<MemberAuthData>>(url, req);

  const accessToken = response.headers["authorization"];
  return { data: response.data.data, accessToken };
};

// 멤버 개발용 로그인
export const postMemberSuperLogin = async (req: {
  memberId: number;
}): Promise<{ data: MemberAuthData; accessToken: string }> => {
  const url = `member/super-login`;

  const response = await authAxios.post<ApiResponse<MemberAuthData>>(url, req);

  const accessToken = response.headers["authorization"];
  return { data: response.data.data, accessToken };
};

// 견주 홈 - 메인
export const handleGetHomeInfo = async (dogId: number): Promise<HomeDataType> => {
  const url = `/member/main`;
  const { data } = await request<HomeDataType>({ url, params: { dogId } });

  return data;
};

// 견주 홈 - 강아지 리스트
export const handleGetDogs = async (): Promise<DogsDataType[]> => {
  const url = `/member/main/dogs`;
  const { data } = await request<DogsDataType[]>({ url });
  return data;
};

/**
 * GET v0/member/main/album
 * 견주 홈 - 앨범
 */
interface MainAlbum {
  dogId: number;
  date?: string;
}
export const handleGetAlbum = async (req: MainAlbum): Promise<ImageList[][]> => {
  const url = `/member/main/album`;
  const { data } = await authAxios.get(url, {
    params: {
      dogId: req.dogId,
      date: req.date
    }
  });
  return data.data;
};

// 견주 정보
export const handleGetMemberInfo = async (): Promise<IMemberInfo> => {
  const url = `/member/mypage`;
  const { data } = await authAxios.get(url);
  return data.data;
};

// 견주 상세 정보
export const handleGetMemberProfileInfo = async (): Promise<IMemberProfileInfo> => {
  const url = `/member/info`;
  const { data } = await authAxios.get(url);
  return data.data;
};

// FIXME 견주 가입신청서 승인 취소 (승인 대기중),(강아지 추가 취소) 차이점이 무엇인지??
// 견주 가입신청서 승인 취소 (승인 대기중)
export const handleCancelMemberEnrollment = async (): Promise<void> => {
  const url = `/member/cancel/enrollmentForm`;
  return await authAxios.post(url);
};

// 견주 가입신청서 승인 취소 (강아지 추가 취소)
export const handlePostMemberDogEnrollment = async (enrollmentFormId: number): Promise<void> => {
  const url = `/member/cancel/enrollmentForm/${enrollmentFormId}`;
  return await authAxios.post(url);
};

// 강아지 삭제하기
export const handlePostMemberDogDelete = async (dogId: string): Promise<void> => {
  const url = `/member/delete/dog?dogId=${dogId}`;
  return await authAxios.post(url);
};

// 견주 상세 정보 수정
export const handleMemberInfoResult = async (
  req: IMemberProfilePostInfo
): Promise<IMemberProfilePostInfo> => {
  const url = `/member/info`;
  const { data } = await authAxios.post(url, {
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
  const { data } = await request<MemberDogInfoData>({
    url,
    params: {
      dogId
    }
  });
  return data;
};

// 견주 홈 - 강아지 상세 정보 수정
export const handlePostMemberDogDetailInfo = async (req: MemberDogInfoReq) => {
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
  const { data } = await authAxios.post(url, {
    dogId: dogId,
    memo: memo
  });
  return data;
};

// 강아지의 픽드랍 메모 수정
export const handlePostMemoDogPickdrop = async (dogId: number, memo: string): Promise<void> => {
  const url = `/member/dog/pickdrop`;
  const { data } = await authAxios.post(url, {
    dogId: dogId,
    memo: memo
  });
  return data;
};

// 강아지 예방 접종 파일 추가 업로드
export const handlePostMemoDogVaccination = async (
  req: DogVaccination
): Promise<DogVaccination> => {
  const url = `/member/vaccination`;
  const { data } = await authAxios.post(url, {
    dogIdList: req.dogIdList,
    imageUriList: req.imageUriList,
    comment: req.comment
  });
  return data;
};

// 강아지 유치원 정보
export const handleGetMemberDogSchool = async (dogId: number): Promise<IMemberDogSchoolInfo> => {
  const url = `member/dog/school?dogId=${dogId}`;
  const { data } = await authAxios.get(url);
  return data.data.school;
};

// 강아지 유의사항 동의 정보
export const handleGetMemberDogPrecaution = async (dogId: number): Promise<PrecautionData> => {
  const url = `member/dog/school?dogId=${dogId}`;
  const { data } = await authAxios.get(url);
  return data.data.precaution;
};

// 멤버 유의사항 상세 내용
export const handleGetMemberAgreement = async (schoolId: number, agreementId: number) => {
  const url = `member/agreement?schoolId=${schoolId}&agreementId=${agreementId}`;
  const { data } = await authAxios.get(url);
  return data.data;
};

// 멤버 유의사항 재동의
export const handlePostMemberAgreement = async (
  dogId: number,
  agreementId: number
): Promise<void> => {
  const url = `member/agreement?dogId=${dogId}&agreementId=${agreementId}`;
  return await authAxios.post(url);
};

// 회원 가입승인후 초기 견주, 강아지 프로필 설정 데이터 조회
export const handleGetMemberProfile = async () => {
  const url = `member/main/profile`;
  const { data } = await authAxios.get(url);
  return data.data;
};

// 회원 가입승인후 초기 견주, 강아지 프로필 설정
export const handlePostMemberProfile = async (req: IMemberProfile): Promise<void> => {
  const url = `member/main/profile`;
  const { data } = await authAxios.post(url, {
    dogId: req.dogId,
    memberProfileUri: req.memberProfileUri,
    dogProfileUri: req.dogProfileUri,
    nickName: req.nickName,
    relation: req.relation
  });
  return data;
};

// 강아지 승인 후 초기 프로필 설정 (두번째 강아지 이후)
export const handlePostDogProfile = async (req: DogProfileReq) => {
  const url = `member/dog/profile`;
  const { data } = await authAxios.post(url, {
    dogId: req.dogId,
    profileUrl: req.profileUrl
  });
  return data;
};

// FIXME 회원 탈퇴 기능 추가 필요
// 회원 탈퇴
export const handleDeleteMember = async () => {
  const url = `member/delete/member`;
  return await authAxios.post(url);
};
