export type SocialProvider = "apple" | "kakao" | "google";

export type MediaType = "photo" | "video" | "mixed";

export interface SelectImageOptions {
  mediaType?: MediaType;
  selectionLimit?: number;
}

export interface CameraOptions {
  mediaType?: MediaType;
  cameraType?: "back" | "front";
  saveToPhotos?: boolean;
  quality?: number;
  videoQuality?: "high" | "medium" | "low";
}
