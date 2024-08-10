import authAxios from "libs/AuthAxios";

import type { DogInfoAgenda, DogInfoRecord } from "types/member/dogs";

/**
 * GET v0/member/dog/info/record (등원기록)
 */
export const handleGetDogInfoRecord = async (
  dogId: number,
  date?: string
): Promise<DogInfoRecord[]> => {
  const url = "member/dog/info/record";
  const { data } = await authAxios.get(url, {
    params: {
      dogId,
      date
    }
  });
  return data.data;
};

/**
 * GET v0/school/agenda/dog/info (알림장)
 */
export const handleGetDogInfoAgenda = async (
  dogId: number,
  date?: string
): Promise<DogInfoAgenda> => {
  const url = `school/agenda/dog/info`;
  const { data } = await authAxios.get(url, {
    params: {
      dogId,
      date
    }
  });
  return data.data;
};
