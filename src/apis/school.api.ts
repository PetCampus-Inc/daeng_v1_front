import customAxios from "libs/CustomAxios";
import type { IEnrollment, IRequestEnrollment, ISchoolInfo } from "types/School.type";

export interface IEnrollmentProps {
  memberId: string;
  schoolId?: string;
  requestUrl?: string;
}

export const handleGetSearchResult = async (searchText: string): Promise<ISchoolInfo[]> => {
  const url: string = `school/search?searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleGetIEnrollment = async ({
  schoolId,
  memberId
}: IEnrollmentProps): Promise<IEnrollment> => {
  const url: string = `school/member/enroll?schoolId=${schoolId}&memberId=${memberId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handleGetIEnrollmentUrl = async ({
  requestUrl,
  memberId
}: IEnrollmentProps): Promise<IEnrollment> => {
  const url: string = `school/member/enroll/${requestUrl}?memberId=${memberId}`;
  const { data } = await customAxios.get(url);
  return data.data;
};

export const handlePostIEnrollment = async (
  requestProps: IRequestEnrollment
): Promise<IEnrollment> => {
  const url: string = `school/member/enroll`;
  const { data } = await customAxios.post(url, {
    requestProps
  });
  return data.data;
};
