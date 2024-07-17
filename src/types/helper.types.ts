export type Nullable<T> = T | null;

export type PropertyValues<T> = T[keyof T];

export type NonEmptyArray<T> = readonly [T, ...T[]];
