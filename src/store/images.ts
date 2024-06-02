import { atom } from "recoil";

export type GalleryImageData = {
  files: FileList;
  comment?: string;
};

export const galleryImgState = atom<GalleryImageData | null>({
  key: "galleryImgAtom",
  default: null
});
