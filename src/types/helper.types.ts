export type Nullable<T> = T | null;

export type PropertyValues<T> = T[keyof T];

export type NonEmptyArray<T> = readonly [T, ...T[]];

/** 날짜만을 표현합니다 (년, 월, 일) */
export type LocalDate = number[];

/** 날짜와 시간을 모두 표현합니다 (년, 월, 일, 시, 분, 초, 나노초) */
export type LocalDateTime = number[];
