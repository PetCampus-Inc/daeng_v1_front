import customAxios from "libs/CustomAxios";
import { request } from "libs/CustomAxios/request";

import type { IRequestAdminEnrollment, IResponseAdminForm } from "types/admin/enrollment.types";
import type { IBreedInfo, ISchoolInfo } from "types/admin/school.types";
import type { IResponse } from "types/helper.type";
import type { IResponseEnrollment, IRequestEnrollment } from "types/member/enrollment.types";

export interface IEnrollmentProps {
  memberId: string;
  schoolId: number;
  requestUrl?: string;
}

export interface IAdminEnrollmentProps {
  formId: string;
}

export const handleGetSchool = async (searchText: string): Promise<ISchoolInfo[]> => {
  const url = "school/search";
  const { data } = await request<IResponse<ISchoolInfo[]>>({
    url,
    params: {
      searchText
    }
  });
  return data;
};

export const handleGetBreed = async (searchText: string): Promise<IBreedInfo> => {
  const sanitizedSearchText = searchText.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9()]/g, "");

  const url = `school/search/breed`;
  const { data } = await customAxios.get(url, {
    params: {
      searchText: sanitizedSearchText
    }
  });
  return data;
};

export const handleGetEnrollment = async ({
  schoolId,
  memberId
}: IEnrollmentProps): Promise<IResponseEnrollment> => {
  const url = `school/member/enroll`;
  const { data } = await customAxios.get(url, {
    params: {
      schoolId,
      memberId
    }
  });
  return data.data;
};

export const handleGetEnrollmentUrl = async ({
  requestUrl,
  memberId
}: IEnrollmentProps): Promise<IResponseAdminForm> => {
  const url = `school/member/enroll/${requestUrl}`;
  const { data } = await customAxios.get(url, {
    params: {
      memberId
    }
  });
  return data.data;
};

export const handleGetAdminForm = async ({
  formId
}: IAdminEnrollmentProps): Promise<IResponseAdminForm> => {
  const url = `school/form/list/${formId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handlePostEnrollment = async (requestProps: IRequestEnrollment): Promise<void> => {
  const url = `school/member/enroll`;
  const { data } = await customAxios.post(url, {
    ...requestProps
  });
  return data.data;
};

export const handlePostAdminForm = async (requestProps: IRequestAdminEnrollment): Promise<void> => {
  const url = `school/form`;
  const { data } = await customAxios.post(url, {
    ...requestProps
  });
  return data.data;
};
