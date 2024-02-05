import customAxios from "libs/CustomAxios";
import type { IEnrollment, IRequestEnrollment, IBreedInfo, ISchoolInfo } from "types/School.type";

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

export const handleGetBreed = async (searchText: string | number): Promise<IBreedInfo> => {
  const url: string = `school/search/breed`;
  const { data } = await customAxios.get(url, {
    params: {
      searchText
    }
  });
  console.log(data);
  return data;
};

export const handleGetIEnrollment = async ({
  schoolId,
  memberId
}: IEnrollmentProps): Promise<IEnrollment> => {
  const url: string = `school/member/enroll?schoolId=${schoolId}&memberId=${memberId}`;
  try {
    const { data } = await customAxios.get(url);
    return data.data;
  } catch (error) {
    throw new Error("handleGetEnrollment 통신 실패");
  }
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
