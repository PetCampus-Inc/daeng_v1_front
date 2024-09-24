import { type AxiosRequestConfig } from "axios";
import { ApiResponse } from "types/Response.type";

import authAxios from ".";

export const request = async <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const { data } = await authAxios.request<ApiResponse<T>>({ ...config });
  return data;
};
