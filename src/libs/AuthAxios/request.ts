import { isCustomError } from "utils/is";

import authAxios from ".";

import type { AxiosError, AxiosRequestConfig } from "axios";

export interface Response<T> {
  data: T;
  status: number;
  message: string;
  responseTime?: number[];
}

export const request = async <T>(config: AxiosRequestConfig): Promise<Response<T>> => {
  try {
    const { data } = await authAxios.request<Response<T>>({ ...config });
    return data;
  } catch (error) {
    if (isCustomError(error)) {
      // CustomError 타입으로 에러를 던짐
      throw error;
    }

    // AxiosError 타입으로 에러를 던짐
    const { response } = error as AxiosError;

    if (response) {
      throw { status: response.status, data: response.data };
    }

    throw error;
  }
};
