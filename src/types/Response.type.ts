import { Response } from "./helper.type";

/**
 * @deprecated Since version 1.0.0 Will be removed in version 2.0. Use {@link Response} instead.
 * @see {@link Response}
 */
export interface IResponse {
  status: number;
  message: string;
}

export interface IError {
  data: {
    status: number;
    message: string;
    code: string;
  };
}
