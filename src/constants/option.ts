export const GALLERY_VIEW = {
  PHOTO: "photo",
  ALBUM: "album"
} as const;

export type GalleryViewType = (typeof GALLERY_VIEW)[keyof typeof GALLERY_VIEW];
