import authAxios from "libs/AuthAxios";
import { request } from "libs/AuthAxios/request";

import type { IBreedInfo, ISchoolInfo } from "types/admin/school.types";
import type {
  EnrollmentDataType,
  EnrollmentInfoType,
  IDogEnrollmentInfo
} from "types/member/enrollment.types";
import type { IMemberSchoolInfo } from "types/member/school.types";

export interface IEnrollmentProps {
  memberId: string;
  schoolId: number;
  requestUrl?: string;
}

/**
 * @description 견주 가입 신청 폼 데이터 반환 - 앱에서 견주 가입 신청 페이지에 접근합니다.
 * @param {number, string} schoolId, memberId
 */
export const handleGetEnrollment = async ({
  schoolId,
  memberId
}: IEnrollmentProps): Promise<EnrollmentDataType> => {
  const url = `school/member/enroll`;
  const { data } = await authAxios.get(url, {
    params: {
      schoolId,
      memberId
    }
  });
  return data.data;
};

/**
 * @description 견주 가입 신청 URL 반환 - url 로 견주 가입 신청 페이지에 접근합니다.
 * @param {string, string} requestUrl, memberId
 */
export const handleGetEnrollmentUrl = async ({
  requestUrl,
  memberId
}: IEnrollmentProps): Promise<EnrollmentDataType> => {
  const url = `school/member/enroll/${requestUrl}`;
  const { data } = await authAxios.get(url, {
    params: {
      memberId
    }
  });
  return data.data;
};

/**
 * @description 견주 가입 신청 - 견주 가입 신청을 합니다.
 * @param {req} req
 */
export const handlePostEnrollment = async (req: EnrollmentInfoType): Promise<void> => {
  const url = `school/member/enroll`;
  const { data } = await authAxios.post(url, {
    ...req
  });
  return data.data;
};

/**
 * @description 유치원 검색 - 유치원을 검색합니다.
 * @param {string} searchText
 */
export const handleGetSchool = async (searchText: string): Promise<ISchoolInfo[]> => {
  const url = "school/search";
  const { data } = await request<ISchoolInfo[]>({
    url,
    params: {
      searchText
    }
  });
  return data;
};

/**
 * @description 견종 검색 - 견종을 검색합니다.
 * @param {string} searchText
 */
export const handleGetBreed = async (searchText: string): Promise<IBreedInfo> => {
  const sanitizedSearchText = searchText.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9()]/g, "");

  const url = `school/search/breed`;
  const { data } = await authAxios.get(url, {
    params: {
      searchText: sanitizedSearchText
    }
  });
  return data;
};

/**
 * @description 유치원 정보 - 견주 마이페이지에서 강아지의 유치원 정보를 보여줍니다.
 * @param {string} dogId
 */
export const handleGetSchoolInfo = async (dogId: string): Promise<IMemberSchoolInfo> => {
  const url = `member/school`;
  const { data } = await authAxios.get(url, {
    params: {
      dogId
    }
  });
  return data.data;
};

/**
 * @description 유치원 연결 끊기 - 견주 마이페이지에서 유치원 연결을 끊습니다.
 * @param {string} dogId
 */
export const handlePostMemberDogSchool = async (dogId: string): Promise<void> => {
  const url = `member/dog/school?dogId=${dogId}`;
  const { data } = await authAxios.post(url);
  return data;
};

/**
 * @description 강아지 가입 신청서 보기 - 강아지의 가입신청서를 보여줍니다.
 * @param {number} dogId
 */
export const handleGetDogEnrollment = async (dogId: number): Promise<IDogEnrollmentInfo> => {
  const url = `member/dog/enrollment?dogId=${dogId}`;
  const { data } = await authAxios.get(url);
  return data.data;
};
