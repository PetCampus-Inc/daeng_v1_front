import { atom, selector, selectorFamily } from "recoil";

export type GalleryImageData = {
  files: FileList;
  comment?: string;
};

export const galleryImgState = atom<GalleryImageData | null>({
  key: "galleryImgAtom",
  default: null
});

export type ImageListType = {
  imageId: number;
  imageUri: string;
  comment?: string;
};

/** 현재 활성화된(저장모드인) 이미지 묶음의 id를 저장합니다 */
export const activeGroupIdState = atom<number | null>({
  key: "activeGroupIdState",
  default: null
});

/** 선택한 이미지들의 id와 uri를 Map 형태로 저장합니다 */
export const selectedImagesState = atom<Map<number, string>>({
  key: "selectedImagesState",
  default: new Map()
});

/** 주어진 이미지 묶음 id가 현재 활성화된 묶음인지 확인합니다. */
export const isActiveGroupSelector = selectorFamily<boolean, number>({
  key: "isActiveGroupSelector",
  get:
    (groupId: number) =>
    ({ get }) => {
      const activeSaveGroupId = get(activeGroupIdState);
      return activeSaveGroupId === groupId;
    }
});

/** 현재 선택된 이미지의 수를 계산합니다. */
export const selectedImagesCountSelector = selector<number>({
  key: "selectedImagesCountSelector",
  get: ({ get }) => {
    const selectedImages = get(selectedImagesState);
    return selectedImages.size;
  }
});

/** 저장 버튼을 활성화할지 여부를 결정합니다. */
export const canSaveSelector = selector<boolean>({
  key: "canSaveSelector",
  get: ({ get }) => {
    const selectedImages = get(selectedImagesState);
    const activeGroupId = get(activeGroupIdState);
    return activeGroupId !== null && selectedImages.size > 0;
  }
});
