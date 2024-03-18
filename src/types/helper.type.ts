export type Nullable<T> = T | null;

export interface IResponse<T> {
  data: T;
  status: number;
  message: string;
  responseTime?: number[];
}
