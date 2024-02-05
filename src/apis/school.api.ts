import customAxios from "libs/CustomAxios";
import { IBreedInfo, ISchoolInfo } from "types/School.type";

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
