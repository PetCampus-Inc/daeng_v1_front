import customAxios from "libs/CustomAxios";

import type { IResponse } from "types/Response.type";
import type {
  IAdminEnrollment,
  IRequestEnrollment,
  IRequestAdminEnrollment,
  IBreedInfo,
  ISchoolInfo
} from "types/School.type";

export interface IEnrollmentProps {
  memberId: string;
  schoolId: string;
  requestUrl?: string;
}

export interface IAdminEnrollmentProps {
  formId: string;
}

export const handleGetSearchResult = async (searchText: string): Promise<ISchoolInfo[]> => {
  const url = `school/search?searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleGetBreed = async (searchText: string): Promise<IBreedInfo> => {
  const url = `school/search/breed`;
  const { data } = await customAxios.get(url, {
    params: {
      searchText
    }
  });
  return data;
};

export const handleGetEnrollment = async ({
  schoolId,
  memberId
}: IEnrollmentProps): Promise<IAdminEnrollment> => {
  const url = `school/member/enroll?schoolId=${schoolId}&memberId=${memberId}`;
  try {
    const { data } = await customAxios.get(url);
    return data.data;
  } catch (error) {
    throw new Error("handleGetEnrollment 통신 실패");
  }
};

export const handleGetEnrollmentUrl = async ({
  requestUrl,
  memberId
}: IEnrollmentProps): Promise<IAdminEnrollment> => {
  const url = `school/member/enroll/${requestUrl}?memberId=${memberId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleGetAdminForm = async ({
  formId
}: IAdminEnrollmentProps): Promise<IAdminEnrollment> => {
  const url = `school/form/list/${formId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handlePostEnrollment = async (
  requestProps: IRequestEnrollment
): Promise<IResponse> => {
  const url = `school/member/enroll`;
  const { data } = await customAxios.post(url, {
    ...requestProps
  });
  return data.data;
};

export const handlePostAdminForm = async (
  requestProps: IRequestAdminEnrollment
): Promise<IResponse> => {
  const url = `school/form`;
  const { data } = await customAxios.post(url, {
    ...requestProps
  });
  return data.data;
};
