import customAxios from "libs/CustomAxios";
import { IResponse } from "types/Response.type";
import { ISchoolInfo } from "types/School.type";

export const handleGetSearchResult = async (
  searchText: string
): Promise<ISchoolInfo[]> => {
  const url: string = `school/search?searchText=${searchText}`;
  const { data } = await customAxios.get(url);
  return data.data;
};
