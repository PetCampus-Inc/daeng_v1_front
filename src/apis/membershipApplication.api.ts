import customAxios from "libs/CustomAxios";
import { IBreedInfo } from "types/MembershipApplication.type";

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
