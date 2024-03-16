import customAxios from ".";

import type { AxiosError, AxiosRequestConfig } from "axios";

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await customAxios.request<T>({ ...config });
    return data;
  } catch (error) {
    const { response } = error as unknown as AxiosError;

    if (response) {
      throw { status: response.status, data: response.data };
    }

    throw error;
  }
};
