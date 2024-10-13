import type { AdminDogImage } from "types/admin/admin.types";

export type ImageItem = Omit<AdminDogImage, "createdAt">;

export interface MediaItem extends ImageItem {
  isVideo: boolean;
}
