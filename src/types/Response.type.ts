/**
 * @deprecated Since version 1.0.0 Will be removed in version 2.0. Use {@link ApiResponse} instead.
 * @see {@link ApiResponse}
 */
export interface IResponse {
  status: number;
  message: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  code: string;
}
