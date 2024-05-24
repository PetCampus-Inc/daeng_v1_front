import { isCustomError } from "utils/typeGuard";

import customAxios from ".";

import type { AxiosError, AxiosRequestConfig } from "axios";

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await customAxios.request<T>({ ...config });
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
