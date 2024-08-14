import type { PropertyValues } from "types/helper.types";

export const SORT_OPTIONS = {
  REGISTERED: "유치원 등록순",
  PAYMENT: "이용권 만료 임박순",
  DATE: "최근 등원순",
  CHARGE: "자주 맡은 강아지순"
} as const;
export type SortOptions = PropertyValues<typeof SORT_OPTIONS>;

export const CARD_OPTIONS = {
  CALL: "견주에게 전화 걸기",
  SEND_ALARM: "이용권 알림 전송하기",
  DELETE: "강아지 삭제"
} as const;
export type CardOptions = PropertyValues<typeof CARD_OPTIONS>;
