import type { PropertyValues } from "types/helper.types";

export const SORT_OPTIONS = {
  REGISTERED: "유치원 등록순",
  PAYMENT: "이용권 만료 임박순",
  DATE: "최근 등원순",
  CHARGE: "자주 맡은 강아지순"
} as const;
export type SortOptions = PropertyValues<typeof SORT_OPTIONS>;
