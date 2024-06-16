export type Nullable<T> = T | null;

export interface Response<T> {
  data: T;
  status: number;
  message: string;
  responseTime?: number[];
}

export type PropertyValues<T> = T[keyof T];

export type NonEmptyArray<T> = readonly [T, ...T[]];