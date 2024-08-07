import type { PropertyValues } from "types/helper.types";

export const LIST = {
  REGISTERED: "유치원 등록순",
  PAYMENT: "이용권 만료 임박순",
  DATE: "최근 등원순",
  CHARGE: "자주 맡은 강아지순"
} as const;

export type TSortOptionList = PropertyValues<typeof LIST>;

export const INIT_COUNTER = 2;

export const GALLERY_VIEW = {
  PHOTO: "photo",
  ALBUM: "album"
} as const;

export type GalleryViewType = (typeof GALLERY_VIEW)[keyof typeof GALLERY_VIEW];
