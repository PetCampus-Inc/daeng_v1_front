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
